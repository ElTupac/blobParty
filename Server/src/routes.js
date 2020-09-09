const express = require("express");
const routes = express.Router();
const path = require("path");

const playerController = require("./playerController");

routes.use(express.static(path.join(__dirname, '/../../Client/')));

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../Client/pages/index.html'));
});

routes.post('/newplayer', playerController.newPlayer);

module.exports = routes;