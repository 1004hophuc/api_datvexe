const express = require('express');

const fingerRouter = express.Router();

fingerRouter.get('/', (req, res) => {
    res.send(req.fingerprint)
})

module.exports = {
    fingerRouter
}