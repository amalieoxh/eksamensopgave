

//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("newAge").value = currentUser.age;
document.getElementById("newDescription").value = currentUser.description;
document.getElementById("editPhone").value = currentUser.phone;
document.getElementById("newCity").value = currentUser.city;
document.getElementById("newZip").value = currentUser.zip;
document.getElementById("newAddress").value = currentUser.address;
document.getElementById("newEmail").value = currentUser.email;
document.getElementById("newPassword").value = currentUser.password;

editUser = document.getElementById("editBtn")

function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

//start en eventlistner ved click på edit user kanppen 
editUser.addEventListener('click', validateFormEdit);

//validate form funktionen defineres
function validateFormEdit(event) {
  //event.preventDefault 
  var age = document.getElementById("newAge").value;
  var description = document.getElementById("newDescription").value;
  var password = document.getElementById("newPassword").value;
  var phone = document.getElementById("editPhone").value;
  var city = document.getElementById("newCity").value;
  var zip = document.getElementById("newZip").value;
  var address = document.getElementById("newAddress").value;
  var email = document.getElementById("newEmail").value;


//herefter tillægger jeg alle ovenstående variable en error med en standard værdi 
  var ageErr = true;
  var descriptionErr = true;
  var passwordErr = true;
  var phoneErr = true;
  var cityErr = true;
  var zipErr = true;
  var addressErr = true;
  var emailErr = true;

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
      "Age: " + age + "\n" + 
      "Description: " + description + "\n" + 
      "Email: " + email + "\n" + 
      "Phone numer: " + phone + "\n" + 
      "City: " + city + "\n" + 
      "ZIP-code: " + zip+ "\n" + 
      "Address: " + address + "\n" + 
      "username: " + username + "\n" + 
      "Password" ; 
  

      updateUser()


      alert("You have now updated your user")
 
}


async function updateUser() {
var username = document.getElementById("username").value;
var age = document.getElementById("newAge").value;
var description = document.getElementById("newDescription").value;
var password = document.getElementById("newPassword").value;
var phone = document.getElementById("editPhone").value;
var city = document.getElementById("newCity").value;
var zip = document.getElementById("newZip").value;
var address = document.getElementById("newAddress").value;
var email = document.getElementById("newEmail").value;

  let updateData = {
      username : username,
      age: age,
      description: description,
      email: email,
      phone: phone,
      city: city,
      zip: zip,
      address: address,
      password : password, 
  }


  axios.put("http://localhost:5000/editProfile/" + username, updateData)
              .then(function(response){
              console.log(response);
          } 
                .then(() => window.location = "../view/userProfile.html")

                )}}
