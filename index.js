// Her eksporteres alle de moduler vi skal bruge til systemet, både fra express og fra egne moduler
const express = require("express");
const bodyParser = require("body-parser"); // Gør at vi kan kommunikere med dataen i JSON format
const cors = require("cors"); // Cross-Origin Resource Sharing, bruges til vores fetch-APIs
/* CORS mekanismen supporterer sikre cross-origin requests og data overførsler mellem browsere og servere.
Moderne browsere bruger CORS i API'er som fetch til at minimere risiciene af cross-origin HTTP requests
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS */

const routes = require("./api");

function startServer() {
    const app = express();
    app.use(cors()); // Så vi kan kommunikere med vores frontend, når begge ting kører på samme maskine
    app.use(bodyParser.json());
    app.use("/", routes.addRoutes()); // Her tilføjes vores routes.
    // Ved at bruge "/", skal vi ikke skrive hele vejen til endpointet. Vi kan nøjes med at skrive endpointet.

  
    // Her lytter den til den givne port, 3000
    app.listen(3000, err => {
        if (err) {
            process.exit(1);
            return;
        }
        console.log(`
        ########################################
        🛡️  Server listening on port: 3000   🛡️ 
        ########################################
    `);
    });
}

startServer();



//const router = express();




//var router = require('/Routes/router')



//app.use('/routes/router.js', router)



//app.get('/', (reg,res) => {
 // res.sendFilde('../view/signUp.html')})


