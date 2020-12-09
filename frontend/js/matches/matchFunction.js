
//benyttter XHR, refererer til API'et, hvor likes.JSOn er blevet hentet 
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    //definere at matchFunction skal køre
    xhr.addEventListener("readystatechange", matchFunction);
    xhr.open("GET", "http://localhost:5000/findMatch", true);
  // definerer vi arbejde med JSON filer 
    xhr.setRequestHeader("Content-Type", "application/json");
    //sender ikke noget tilbage, da jeg har fravalgt at lave en matches.JSON fil med matchID for at minimere datamængden 
    xhr.send();
})
 
    function matchFunction () {
        if(this.readyState === 4) {
            //henter alle likes og definere dem under variablen findingMatches
            var findingMatches = this.response;
            //console.logger for at tjekke at vi har hentet alle likes
            console.log(findingMatches)
          
            //henter oplysningerne om den bruger som er logget ind, for kun at vise denne persons matches og ikke andre brugeres
            let currentUser = JSON.parse(localStorage.getItem("currentUser"))

            //her starter match-algotitem 
            // for-loopet som tager arrayet og looper gennem matches
            //laver et dobbelt-forloop 
            for(var i=0; i< findingMatches.length; i++){
                for(var j=0; j < findingMatches.length; j++){
                    //tjeker at den bruger der er logget ind er "ejeren" af liket
                    if (currentUser.username === findingMatches[i].username 
                        && 
                        //tjekker at den som har lavet liked også har fået like af den modsatte bruger 
                        findingMatches[i].username === findingMatches[j].likedUser 
                        && 
                        findingMatches[i].likedUser === findingMatches[j].username ){
                        console.log(findingMatches[i].likedUser)  

                        alert ("You've found a match!")  

                        
                        //herefter laves der inline HTML i JS, for at gøre det dynamisk ift. det skiftende antal af matches 
                        var matchRow = document.createElement('div');
                        matchRow.classList.add('match-row'); //vi bruger CSS stilen 'match-row'for div elementet matchRow
                        //vi vil senere tilføje en række til  div sektionen 'match-items' hvor de valgte personer listes 
                        var matchItems = document.getElementsByClassName('match-items')[0]; 
                        //Generer html-indholdet til en linje med det valgte match, (Web Dev Simplified - youtube, 2018)
                        //viser brugernavnet på den matchede bruger 
                        // laver en knap til at fjerne matchet fra matchlisten

                        let matchRowContents = `   
                            <div class="match-items match-column">
                                <span class="match-name">${findingMatches[i].likedUser}</span>
                                        
                            </div>
                        
                            <div class="match-quantity match-column">
                            <button class="btn btn-danger" id="${findingMatches[i].likedUser}" type="button">REMOVE</button>
                            </div>`
                    
                      matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
                        matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
                        //De næste to linjer Sørger for at henholdsvis removeMatch funktion kaldes når der trykkes på knappen
                        matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatchHTML);
                    }

                } 

            }
          
        }
    }



//funktion for at fjerne et match fra både HTML siden 
function removeMatchHTML(event) {
    //brugernavnet på den bruger som skal slettes fanges 
    var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes. 
    buttonClicked.parentElement.parentElement.remove(); // fjerner den aktuelle html række, for det match, som brugeren ønskede fjernet.

    //starter sendUpdate funktionen 
sendUpdate(buttonClicked.id); // dette id er den person der klikkes på username 

}

//inddrager username for den som skal slettes, det er blevet send fra removeMatchHTML, herved kan vi benytte denne data i API'et
function sendUpdate(username){ 
    //henter den bruger som er logget ind og skærerper det herefter ind kun til username 
    let currentUser = localStorage.getItem("currentUser");
    let curentUserUsername = currentUser.username
    //definere navnet på den bruger, hvor der trykkes på delete under variabel navnet clickUser
    let clickUser = username  
    //stiller de to variabel, altså den bruger som er logget ind og den som skal slettes i et array for letter at kunne sende det samlet til API'et
    let userArray = [curentUserUsername, clickUser]

    //benytter axios delete request for at simplificere koden. 
    //dette userArray, som sendes til deleteReqestet vil således i API'en blive filteret 
    axios.delete("http://localhost:5000/deleteMatch", {
        data: userArray
    })
    .then(response=>{
        console.log(response.data)
    })}