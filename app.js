// Get peer id (hash) from url
const myPeerId = location.hash.slice(1);

// Connect to Peer server
const peer = new Peer(myPeerId, {
    host: "glajan.com",
    port: 8443,
    path: "/myapp",
    secure: true,
});

// Declare variables for HTML elements
const myPeerIdEl = document.querySelector(".my-peer-id");
const listPeersButtonEl = document.querySelector(".list-all-peers-button");
const peersListEl = document.querySelector(".peers");

// Runs when a connection to the server is opened
peer.on('open', (id) => {
    myPeerIdEl.innerText = id;
});

// Logs error messages from the server
peer.on('error', (errorMessage) => {
    console.error(errorMessage);
});

// Event listener for the Refresh List button
listPeersButtonEl.addEventListener('click', () => {
    peersListEl.innerHTML = "";
    peer.listAllPeers((peers) => {
        const peersList = document.createElement('ul');

        peers.filter((peerId) => peerId !== peer.id).forEach((peerId) => {
            const newPeerListEl = document.createElement('li');
            const newPeerButtonEl = document.createElement('button');

            newPeerButtonEl.innerHTML = peerId;
            newPeerButtonEl.classList.add('connect-button', `peerId-${peerId}`);

            newPeerListEl.appendChild(newPeerButtonEl);
            peersList.appendChild(newPeerListEl);
        });
        peersListEl.appendChild(peersList);
    });
});
