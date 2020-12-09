//benytter XHR 
document.addEventListener("DOMContentLoaded", function() {
   const xhr = new XMLHttpRequest();
   xhr.responseType = "json"

   //henter matchescontainer fra HTMLfilen 
   var matchesContainer = document.getElementById('matchesContainer');
   //console.log(matchesContainer)

   //henter alle brugere, som herefter skal displayes på siden 
   xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
         var allPotentialMatches = this.response;
         console.log(allPotentialMatches)
       
            // for-loopet som tager arrayet og looper gennem alle potentiale matches
            for(var i=0; i< allPotentialMatches.length; i++){

            // variabel en div genenem variablen match, herved simplificeres HTML 
            var match = document.createElement('div');
         
            // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
            match.className = "match";
            
            // displayer navne på oprettede brugere i potentialLikes.html
            //ved tryk på brugernavnet skal interMatch funktionen starter, hvori man får hele brugerens profil på sin egen URL side 
            match.innerHTML += '<div class="matchName" id='+allPotentialMatches[i].username+
            ' onClick="interMatch('+allPotentialMatches[i].username+')">'+allPotentialMatches[i].username+'</div>';
            // displayer navnet på det eventuelle match 
         
            // tager Child af matchescontaine
            matchesContainer.appendChild(match);
            }
            
         }

      })

      
         

      xhr.open("GET", "http://localhost:5000/matches", true);
         
      // definerer at det er en JSON-fil der skal arbejdes med
      xhr.setRequestHeader("Content-Type", "application/json");
      
      //sender ikke noget tilbage, da ovenstående er til for at vise brugerne og ikke har en tovejs forbindelse til databasen 
      xhr.send();
               
   
   
   
})

//funktionen interMartch, som skal vise den fulde profil, som trykkes på, på sit eget URL 
async function interMatch(username){
   const xhr = new XMLHttpRequest();
   xhr.responseType = "json"

   xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
         var allPotentialMatches = this.response;
         //lopper igenenm alle brugerne 
         for (var i = 0; i < allPotentialMatches.length; i++) {         
            //tjekker om  brugeren der trykkes på ligger i allPotentialMatches (storage.JSON)   
            if (allPotentialMatches[i].username == username.id) {
               //når der trykkes på brugeren laves der et item i localStorage, såedes at serveren ved hvilken bruger, som skal displayes 
                let founduser =  allPotentialMatches[i];
                //lægger den fundende bruger ind i sessionstorage
                sessionStorage.setItem('founduser', JSON.stringify(founduser))
                window.location = "../views/interLike.html"
            }
        }
      }

   })

      
         

      xhr.open("GET", "http://localhost:5000/matches", true);
         
      // definerer at det er en JSON-fil der skal arbejdes med
      xhr.setRequestHeader("Content-Type", "application/json");
      
      //sender ikke noget tilbage, da der ikke skal oprettes noget i databasen. 
      //Dette skal først ske på siden interLike, da det er her man kan like og dislie 
      xhr.send();
               

   
}