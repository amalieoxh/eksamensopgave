// dette er et udkast, fra en server der fungerer
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors'); // Hvad bruges cors til? 
const bodyParser = require('body-parser');
const port = 2500;
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); //finder kun json data

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})


app.get('/', (req, res)=> {
    let data = 'Get request virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
app.post('/', (req, res)=> {
    let reqData = req.body;
    console.log('Post request virker')
    console.log(reqData)
    var storage = JSON.parse(fs.readFileSync("storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("storage.JSON", JSON.stringify(storage, null, 2));

    //console.log(reqData);
    res.send(JSON.stringify({besked: 'Her oprettes en bruger, her er hans oplysninger:', storage}));
})



app.get('/signIn', (req, res)=> {
    let data = 'Get request signin virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("storage.JSON"))

    console.log(loginData)
    
    for (let i = 0; i < createdUser.length; i++) {
        if (loginData.username === createdUser[i].username && loginData.password === createdUser[i].password) {

            return res.json(createdUser[i]);

            //CurrentUser skal vise brugeroplysningerne på den bruger, som logger ind
            //localStorage.setItem('currentUser', JSON.stringify(createdUser[i]));
            //location.href = "userProfile.html";
            
            // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
            // return true;
        }

    }
    res.json({err:"Failed"});


})


app.get('/matches', (req, res)=> {
    var allMatches = JSON.parse(fs.readFileSync("storage.JSON"))
    res.json(allMatches)
})

app.listen(port, console.log(port));