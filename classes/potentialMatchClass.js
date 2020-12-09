
const express = require('express');
const router = express.Router();


class PotentialMatch{
    constructor(username, age, description){
        this.username = username;
        this.age = age;
        this.city = city;
        this.description = description;
    }
}

module.exports = PotentialMatch;