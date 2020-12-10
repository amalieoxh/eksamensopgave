
//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

// henter information fra min User Klasse, som blev oprettet i signUp.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("age").value = currentUser.age;
document.getElementById("description").value = currentUser.description;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("city").value = currentUser.city;
document.getElementById("zip").value = currentUser.zip;
document.getElementById("address").value = currentUser.address;
document.getElementById("email").value = currentUser.email;


//opretter en variabel for log ud knappen
var logOutBTN = document.getElementById("logOutBtn");

//Funktionen startes ved klik på log ud knappen 
logOutBTN.addEventListener("click", function() {
    //sletter data fra localStorage 
    localStorage.removeItem('currentUser'); 
    sessionStorage.removeItem('foundUser'); 

    //sender brugeren til siden, hvor vedkommende kan logge ind 
    window.location.replace("./signIn.html")
})









