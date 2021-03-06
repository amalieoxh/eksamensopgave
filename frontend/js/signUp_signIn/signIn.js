    
//signIn funktionen igangsættes ved klik på submit jf. signIn.html 
function signIn() {
    //henter username og password feltet fra HTML 
    var username = document.getElementById("username");
    var password = document.getElementById("password");            
    //opretter loginData som skal sendes til API'et 
    var loginData = {
        username : username.value,
        password : password.value,
                    }
    sendLogin(loginData);
}
function sendLogin(loginData) {
     //laver et nyt XHR request 
     const xhr = new XMLHttpRequest();
     xhr.responseType = "json"
     xhr.addEventListener("readystatechange", logIn);
    // Her henvises til vores POST-request fra serveren
    xhr.open("POST", "http://localhost:5000/signIn", true);        
     // definerer at der arbejdes med JSON fil 
    xhr.setRequestHeader("Content-Type", "application/json");    
    // Den data brugeren har indtastet sendes tilbage til serveren, hvor den bliver sammenlignet med det fra databasen
    xhr.send(JSON.stringify(loginData));
}
//log ind funktionen startes
function logIn(){
    if(this.readyState === 4) {
        const response = this.response 
         console.log(response)
         //henviser til fejlbeskeden fra API'et, hvor valideringen af brugeren ift. databasen foretages
         if (response.err !== 'Failed'){
             //gemmer den bruger der er logget ind i currentUser, herved kan computeren huske brugere
             localStorage.setItem('currentUser', JSON.stringify(response));
             //sender brugeren videre til sin profil side
             window.location.href = ("userProfile.html")
            } else {
                alert("Login information not correct")
            }
            console.log(response); //tjekker at response kommer tilbage 
        }
}
    