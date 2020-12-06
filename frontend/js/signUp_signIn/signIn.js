    
//signIn funktionen igangsættes ved klik på submit jf. signIn.html 
        function signIn(){
            //laver et nyt XHR request 
            const xhr = new XMLHttpRequest();
            xhr.responseType = "json"
        
           
                //henter username og password feltet fra HTML 
                var username = document.getElementById("username");
                var password = document.getElementById("password");
        
                //opretter loginData som skal sendes til API'et 
                var loginData = {
                    username : username.value,
                    password : password.value,
                }
        
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    const respo = this.response 
                    console.log(respo)
                    //henviser til fejlbeskeden fra API'et, hvor valideringen af brugeren ift. databasen foretages
                    if (respo.err !== 'Failed'){
                        // alert success

                        //gemmer den bruger der er logget ind i currentUser, herved kan computeren huske brugeren
                        localStorage.setItem('currentUser', JSON.stringify(respo));
        
                        //sender brugeren videre til sin profil side
                        window.location.href = ("userProfile.html")
                        
                    }
                    console.log(respo); //tjekker at response kommer tilbage 
                }

             })
            // Her henvises til vores POST-request fra serveren
            xhr.open("POST", "http://localhost:5000/signIn", true);
        
            // definerer at der arbejdes med JSON fil 
            xhr.setRequestHeader("Content-Type", "application/json");
        
            // Den data brugeren har indtastet sendes tilbage til serveren, hvor den bliver sammenlignet med det fra databasen
            xhr.send(JSON.stringify(loginData));
    
        }
    