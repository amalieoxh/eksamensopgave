
const express = require('express');
const router = express.Router();


class Like {
    constructor(username, likedUser){
        this.username = username;
       this.likedUser = likedUser;
    }
}

module.exports = Like;

