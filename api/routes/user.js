
const express = require("express");
const route = express.Router();
const model = require("../model/myProfile/userProfile");
const customer = model.model;


module.exports = {
    addEndpoints: async (router) => {
        router.use("/user", route);

        //GET - READ
        route.get("/", (req, res) => {
            getAllCustomers().then((result) => {
                res.status(200).json(result);
                //det andet argument i rouste.get er en callback funktion, som indeholder getAllcustomeres som kalder den relevante control-function, der gør brug af dbServices.find
                // denne control-function kommunikerer med modellen, og henter de relevante data
                // de relevante data kommer ind i response (res) og vises i json-format
                res.status(200).json(result);
                // Status 200 er ok
            });

        });
    },
};




























//var express = require('express')
//var router = express.Router()


//middelware specific til denne router


/*
router.use(function timeLog(req,res, next) {
    console.log('Time: ', Date.now())
})

//define the homepage route
router.get('/', function(req, res){
    res.send('Dating Universe Webpage')
})

//define the route 
router.get('/signIn', function(req,res){
    res.send('Test')
})

router.get('/profile', function(req, res) {
    res.send('myProfile')
})

router.get('/matches', function (req, res){
    res.sendFile(/Users/amalieoxholm/Desktop/Programmering/Eksamensprojekt/view/matches.html)
})

module.exports = router
*/