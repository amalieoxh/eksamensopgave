// dette er et udkast, fra en server der fungerer
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors'); // Hvad bruges cors til? 
const bodyParser = require('body-parser');
const port = 5000;
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); //finder kun json data

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})

//request til signUp
app.get('/', (req, res)=> {
    let data = 'Get request virker'
    let dataStringified = JSON.stringify(data);
    res.send(dataStringified);
})

// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
app.post('/', (req, res)=> {
    let reqData = req.body;
    console.log('Post request virker')
    console.log(reqData)
    var storage = JSON.parse(fs.readFileSync("./database/storage.JSON"))
    storage.push(reqData);
    fs.writeFileSync("./database/storage.JSON", JSON.stringify(storage, null, 2));

    //console.log(reqData);
    res.send(JSON.stringify({besked: 'Her oprettes en bruger, her er hans oplysninger:', storage}));
})

//dette request tjekker om brugernavnet allerede er taget 
app.post('/ifExisting', (req, res)=> {
    let validationData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("./database/storage.JSON"))

    
    //check for om username er brugt i forvejen
    for (let i = 0; i < createdUser.length; i++) {
        console.log(req.body)
        if (validationData.username === createdUser[i].username) {
            return res.status(500).json({message:"Failed"});
        }}

        res.json({message:"bruger oprettes"})
        //her kommer alt bruger-oprettelses-logik
})



//request til signIn 
app.get('/signIn', (req, res)=> {
    let data = 'Get request signin virker'
    let dataAsString = JSON.stringify(data);
    res.send(dataAsString);
})

app.post('/signIn', (req, res)=> {
    let loginData = req.body;
    var createdUser = JSON.parse(fs.readFileSync("./database/storage.JSON"))

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


//request til at displaye mulige matches 
app.get('/matches', (req, res)=> {
    var allPotentialMatches = JSON.parse(fs.readFileSync("./database/storage.JSON"))
    res.json(allPotentialMatches)
})

//disse intermatch requests henvender sig til filen interLike.js, hvori en brugers fulde profil vises og man kan like eller dislike
// like knap: tag data fra sessionStorage (founduser), og send dette til en likes.json fil. 
app.post('/interMatch', (req, res)=> {
    let interMatchData = req.body;
    let likesArray = JSON.parse(fs.readFileSync("./database/likes.JSON"))
    likesArray.push(interMatchData)
    console.log(likesArray)
    fs.writeFileSync("./database/likes.JSON", JSON.stringify(likesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + liked bruger til JSON', likesArray}));
})


app.post('/interMatchDis', (req, res)=> {
    let interMatchDataDis = req.body;
    let disLikesArray = JSON.parse(fs.readFileSync("./database/disLike.JSON"))
    disLikesArray.push(interMatchDataDis)
    console.log(disLikesArray)
    fs.writeFileSync("./database/disLike.JSON", JSON.stringify(disLikesArray, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender vores egen bruger + disliked bruger til JSON', disLikesArray}));
})

app.get('/findMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("./database/likes.JSON"))
    res.json(allLikes)
})

//henter alle brugerne 
app.get('/allusers', (req, res)=> {
    var allUsers = JSON.parse(fs.readFileSync("./database/storage.JSON"))
    res.json(allUsers)
})



//herefter benuyttes axious i de efterfølgende requests 

//request til at slette en bruger
app.delete('/deleteUser', (req, res)=> {
    
    let userArray = JSON.parse(fs.readFileSync("./database/storage.JSON"))
    let newUsers = userArray.filter(user=> user.username !== req.body.username);
    fs.writeFileSync("./database/storage.JSON", JSON.stringify(newUsers, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender det nye userarray tilbage', newUsers}));

})

// request til at updatere sin profil 
app.put('/editProfile/:username', (req, res) => {
    data = fs.readFileSync("./database/storage.JSON", "utf8") 
        let parsedData = JSON.parse(data)
        const username = req.params["username"];
        let needupdate = parsedData.findIndex(element => {
            return element.username == username})
    
        // this will use the current user, and only update those fields 
        // which are sent in the request body. If only one field is sent, 
        // only that field will be updated.
  
        const updatedUser = {...parsedData[needupdate], ...req.body}  
       
        // sætter så parsedData til den opdaterede user
        parsedData[needupdate] = updatedUser 


        fs.writeFileSync("./database/storage.JSON", JSON.stringify(parsedData, null, 2))
        res.status(200).json({msg: "succes"})
})


//request til at slette et match 
app.delete('/deleteMatch', (req, res)=> {
    var allLikes = JSON.parse(fs.readFileSync("./database/likes.JSON"))
    var CurrentUser = req.body[0];
    var clickUser = req.body[1];
    
    let newLikes = allLikes.filter(user=> user.likedUser !== clickUser && user.username !== CurrentUser);
    fs.writeFileSync("./database/likes.JSON", JSON.stringify(newLikes, null, 2));
    res.send(JSON.stringify({besked: 'Vi sender det nye likes array tilbage', newLikes}));
    })

    app.listen(port, console.log(port));

    module.exports = app; //for testing
