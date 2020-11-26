
//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("city").value = currentUser.city;
document.getElementById("zip").value = currentUser.zip;
document.getElementById("address").value = currentUser.address;
document.getElementById("email").value = currentUser.email;



var logOutBTN = document.getElementById("logOutBtn").addEventListener("click",logOut);

function logOut() {
    return localStorage.removeItem('currentUser'); 
}



var removeItem = document.getElementById("deleteBtn").addEventListener("click",deleteAccount);


//funktion for at fjerne et match fra både HTML siden og arrayet i local storage 
function deleteAccount() {
    //var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes
    //Få fat i den aktuelle række, hvor ”remove” knappen er blevet aktiveret
    /*Udover at fjerne matches på html siden skal vi også fjerne matches fra match listen,
    som er gemt som ”likes” på localStorage. Vi finder det object, som svarer til matchnavnet
     og fjerner det fra localstorage ved at udskifte arrayed i localStorage med et nyt array, hvor matched er fjernet */
   var accounts = JSON.parse(localStorage.getItem("User"));
   var current = JSON.parse(localStorage.getItem("currentUser"));
    var i;
    for (i = 0; i < accounts.length; i++) {
        if (accounts[i]._username == current._username){
            accounts.splice(i,1); /*der slettes et element ved position index i myMatches arrayet,
            så det pågældende element også slettes fra localStorage: inspireret fra (Stack Overflow Spice, 2016) og  (W3schools splice, 2019)*/
          
            localStorage.setItem("User", JSON.stringify(accounts));
            
            return localStorage.removeItem('currentUser'); 
            
        }
    

    }
}




/*
var removeItem = document.getElementById("deleteBtn").addEventListener("click",deleteAccount);

function deleteAccount() {
   var accounts = JSON.parse(localStorage.getItem("User"));
   var current = JSON.parse(localStorage.getItem("currentUser"));
    var i;
    for (i = 0; i < accounts.length; i++) {
        if (accounts[i]._username == current._username){
            accounts.splice(i,1); 
            localStorage.setItem("User", JSON.stringify(accounts));
            
            return localStorage.removeItem('currentUser'); 
             
        }
        

}}
*/








