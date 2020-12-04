
//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var foundUser = JSON.parse(localStorage.getItem("foundUser"));

// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("age").value = currentUser.age;
document.getElementById("description").value = currentUser.description;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("city").value = currentUser.city;
document.getElementById("zip").value = currentUser.zip;
document.getElementById("address").value = currentUser.address;
document.getElementById("email").value = currentUser.email;



var logOutBTN = document.getElementById("logOutBtn");
//.addEventListener("click",logOut);

logOutBTN.addEventListener("click", function() {
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('foundUser'); 

    window.location.replace("./signIn.html")
})









