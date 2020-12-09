
const express = require('express');
const router = express.Router();


class dislike {
    constructor(username, likedUser){
        this.username = username;
       this.dislikedUser = likedUser;
    }
}

module.exports = dislike;

