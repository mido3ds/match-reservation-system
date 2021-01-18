const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

const clients = {}

function notifyClients(matchID, seatID, isReserved) {
    let seatStatus = { seatID: seatID, isReserved: isReserved }
    if (clients[matchID]) {
        clients[matchID].forEach(client => {
            client.res.write(`data: ${JSON.stringify(seatStatus)}\n\n`)
        });
    }
}

function identifyUser(req) {
    return req.query.uuid+req.ip+req.socket.address().address+JSON.stringify(req.headers);
}

router.get('/', (req, res) => {
    let matchID = req.params.match_id;
    let client = {
        id: identifyUser(req),
        res
    }
    if (!clients[matchID])
        clients[matchID] = [];
    
    // remove connections from same user
    clients[matchID] = clients[matchID].filter(c => c.id !== client.id);
    clients[matchID].push(client);

    res.writeHead(200, {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    res.write('\n\nretry: 2\n\n');

    req.on('close', () => {
        clients[matchID] = clients[matchID].filter(c => c.id !== client.id);
    });
});

module.exports = { router, notifyClients }