
//var signUpButton = document.getElementById("SignedUp").addEventListener("click",validateForm);


// benytter klassen fra classUser.js
//const User = require('../classes/userClass')

// herefter valideres samtlige felter ved oprettelse af en ny bruger 

//fejl og errors defineres
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

//validate form funktionen defineres
function validateForm(event) {
    //event.preventDefault 
    var username = document.getElementById("username").value;
    var age = document.getElementById("age").value;
    var description = document.getElementById("description").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;


//herefter tillægger jeg alle ovenstående variable en error med en standard værdi 
    var usernameErr = true;
    var ageErr = true;
    var descriptionErr = true;
    var passwordErr = true;
    var phoneErr = true;
    var cityErr = true;
    var zipErr = true;
    var addressErr = true;
    var emailErr = true;

// validere userName
if (username ==""){
    printError("usernameErr", "Type in a username");
}
//klargøre hvilke tegn username må indeholde --> disse tegn er fundet på stack Overflow
//https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
else {
    var regex = /^[a-zA-Z\s]+$/;

//hvilke situationer der skal printes en errormessage defineres
    if (regex.test(username) === false){
        printError("usernameErr", "Please enter a username using the standard alphabet");
    }
    
    if(regex.test(username) == true){
    
            const xhr = new XMLHttpRequest();
            xhr.responseType = "json"    
        
            // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
            xhr.open("post", "http://localhost:2500/ifExisting");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify({username}));

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    const res = this.response 
                    if (res.message === "Failed"){
                        printError("usernameErr", "username taken");
                    }
                    //
                    console.log('hek')
                           // validere age
    if (age ==""){
        printError("ageErr", "please enter your age");
    }

        //validere description
        if (description ==""){
            printError("descriptionErr", "please write a description");
        }


// email valideres
    if (email =="") {
        printError("emailErr", "please enter an email")
    }
//definere hvilke tegn email må indeholde
    else{
        var regexMail = /^\S+@\S+\.\S+$/;
        if (regexMail.test(email) === false) {
            printError("emailErr", "Please enter a valid email")
        }else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

//Validering af telefon nummer
    if (phone ==""){
        printError("phoneErr", "please enter your phone number");
    } else {
        //regex fra stackoverflow
        var regexPhone = /^[0-9]{8}$/;
        if (regexPhone.test(phone)===false){
            printError("phoneErr", "please enter a validt phone number - hint it has to be 8 digits")
        } else {
            printError("phoneErr", "");
            phoneErr = false;
        }
    }

//validering af by  
    if (city ==""){
        printError("cityErr", "please enter a city");
    } else {
        //samme regex fra username - fra stackoverflow
        var regexCity = /^[a-zA-Z\s]+$/;
        if(regexCity.test(city) === false) {
            printError("cityErr", "Cityname can only contain letters from A-Z");
        }else {
            printError("cityErr", "");
            cityErr = false;
        }
    }

//validating af postnummer, da datingappen er i DK, sættes antal cifte til 4 

    if (zip==""){
        printError("zipErr", "please enter a valid ZIP-code");
    } else {
        //der benyttes samme regex som til telefonnummer dog ændres antal digits til 4 fremfor 8 
        var regexZip = /^[0-9]{4}$/;
        if (regexZip.test(zip) === false) {
        printError("zipErr","Please enter a valid ZIP-Code, it should be exactly 4-digits") ;
        }
        else {
            printError("zipErr", "");
            zipErr = false;
        }
    }

//validering af adresse - regex fra stackoverflow
//https://stackoverflow.com/questions/3763820/javascript-regular-expression-to-validate-an-address
    if (address==""){
        printError("adressErr", "please enter an address"); 
    } else {
        var regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexAddress.test(address) === false) {
            printError("addressErr", "You have to type in a valid address");
        } else {
            printError("addressErr", "");
            addressErr = false;
        }
    }

//validering af password 
    if (password==""){
        printError("passwordErr", "Please type a password");
    }else {
        //password regex fra stackoverflow
        var regexPassword = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (regexAddress.test(password)===false){
            printError("passwordErr", "please enter a secure password");
        }else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

//herefter sørges der for at, hvis nogle af oplysningerne er forkerte, skal storeDetails funktionen ikke køre.
    if ((usernameErr || phoneErr || cityErr || zipErr || addressErr || emailErr || passwordErr) == true){
        return false;
    } else {
    // laver en ny string, som viser hvad der er blevet indtastet 
        var detailsPreview = "You have entered the following details: \n" +
        "Username: " + username + "\n" + 
        "Age: " + age + "\n" + 
        "Description: " + description + "\n" + 
        "Email: " + email + "\n" + 
        "Phone numer: " + phone + "\n" + 
        "City: " + city + "\n" + 
        "ZIP-code: " + zip+ "\n" + 
        "Address: " + address + "\n" + 
        "username: " + username + "\n" + 
        "Password" ; 
    
/*
//Herefter oprettes en variable for oprettede bruger, som sendes til localstorage
    var createdUser = JSON.parse(localStorage.getItem("User"));
    console.log(createdUser);
    //pusher ny bruger ind i et array 
    createdUser.push(new User (username, password, phone, city, zip, address, email));
    console.log(createdUser);
    //createduser laves til en string 
    var newUserAdd = JSON.stringify(createdUser);
    //tilføjes til local storage
    localStorage.setItem("User", newUserAdd);
    //tilføjer en alert 
    alert(detailsPreview);
    alert('New User has been created');
    console.log(newUserAdd);
*/

   

}
                    
}
})    
sendDataToJSON()
// window.location: returns the href (URL) of the current page
window.location = ("signIn.html");
        
 }}
 




// Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
function sendDataToJSON (){
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // Variabler som henter alle inputfelternes id, så vi kan arbejde med de inputs brugeren giver os.
    const username = document.getElementById('username');
    const age = document.getElementById('age');
    const description = document.getElementById('description');
    const phone = document.getElementById('phone');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    var data = {
        username : username.value, 
        age : age.value, 
        description : description.value, 
        phone : phone.value,
        city : city.value,
        zip : zip.value,
        address : address.value,
        email : email.value,
        password : password.value,
    }

     
    //console.log(users); //Tjekker hvorvidt vi har fået noget input fra brugeren

    // idk den tjekker vel for om siden er klar, og sender en fejl hvis den ikk er
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
    }
    });

    // "Åbner" vores http request og angiver at det er POST request fra serveren på localhost:3000
    xhr.open("POST", "http://localhost:2500/", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sender http requested afsted. Den sender altså den data som er indtastet af brugeren, til vores server (localhost). 
    xhr.send(JSON.stringify(data));
}

}