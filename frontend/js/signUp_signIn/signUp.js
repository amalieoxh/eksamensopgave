

class User {
    constructor(username, password, age, description, phone, city, zip, address, email, gender){
        this.username = username;
        this.password = password;
        this.age = age;
        this.description = description;
        this.phone = phone;
        this.city = city;
        this.zip = zip;
        this.address = address;
        this.email = email;
        this.gender = gender;
    }
}

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
                xhr.open("post", "http://localhost:5000/ifExisting");
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify({username}));
    
                xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                        const res = this.response 
                        if (res.message === "Failed"){
                            printError("usernameErr", "username taken");
                        }
               
                        
    // validere age
    if (age ==""){
        printError("ageErr", "please enter your age");
    } else {
        //regex fra stackoverflow
        var regexage = /[0-9]/;
        if (regexage.test(age)===false){""
            printError("ageErr", "please enter a valid age")
        } else {
            printError("ageErr", "");
            ageErr = false;
        }
    }

        //validere description
        if (description ==""){
            printError("descriptionErr", "please write a description");
            descriptionErr=false;
        } else {
            //password regex fra stackoverflow
            var regexDescription = /^[a-zA-Z\s]+$/
            if (regexDescription.test(description)===false){
                printError("descriptionErr", "please enter a description with characters from A-Z");
            }else {
                printError("descriptionErr", "");
                descriptionErr = false;
            }
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

//herefter sørges der for at, hvis nogle af oplysningerne er forkerte, skal sendDataToJSON funktionen ikke køre.
    if ((ageErr || descriptionErr || phoneErr || cityErr || zipErr || addressErr || emailErr || passwordErr) == true || res.message === "Failed"){
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
        "Password" ; 
  
        //startet sendDataToJSON funktionen 
        // window.location: returns the href (URL) of the current page
        alert(detailsPreview);
        alert('new user has been created!');
        sendDataToJSON()
        window.location = ("signIn.html");

}
}              
}
)}
}

 


// Funktion som sender data til serveren, hvor dataen sendes til en JSON fil. 
function sendDataToJSON (){
    console.log("hejsa")
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    // henter alle inputfelternes ID og giver dem en variabel 
    const username = document.getElementById('username');
    const age = document.getElementById('age');
    const description = document.getElementById('description');
    const phone = document.getElementById('phone');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    //opretter et objekt med den data, som skal sendes tilbage til API'et
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
    // jf. XHR hentes response fra API'et 
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
    }
    });
    // Her henvises til vores POST-request fra serveren
    xhr.open("POST", "http://localhost:5000/", true);
    // der arbejdes med JSON filer 
    xhr.setRequestHeader("Content-Type", "application/json");
    // sender http requestet afsted til vores servere, herbev den data, som brugeren har indtastet i inputfelterne. 
    xhr.send(JSON.stringify(data));
}
}