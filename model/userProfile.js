
//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));



// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
currentUser.username = document.getElementById("username").value;
currentUser.phone =document.getElementById("phone").value;
currentUser.city = document.getElementById("city").value;
currentUser.zip = document.getElementById("zip").value;
currentUser.address = document.getElementById("address").value;
currentUser.email =document.getElementById("email").value;

