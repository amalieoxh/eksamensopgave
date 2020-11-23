
/* Sørger for at html siden er loadet, så de html elementer, som javascript koden benytter faktisk eksisterer.
Sålænge document.readystate er "loading", så venter vi på at det er færdigt med at loade,
og når eventen DOMContentLoaded indtræffer, så udfør funktionen ready. Såfremt siden allerede er loadet skal vi
ikke vente på noget (else delen) og kalder direkte funktionen ready*/


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)  /*Der benyttes et load event listener kald hvor
callback funktionen indeholder det kode som skal udføres når HTML siden er loadet.*/

} else {
    ready()
}


function ready() {
    /*Check i localStorage om der er gemt matches, og hvis det er tilfældet så indlæses de myMatches arrayet.
    Hvert element er et object af typen match */
    
    var myMatches = JSON.parse(localStorage.getItem("likes")); //dette skal ændres til matches

    if(myMatches != null) {  //Tjek om der er gemt et match array object i localStorage
        //For hvert match i myMatches arrayet tilføjer vi det til siden my matches ved kald til addItemToCart

        
        myMatches.forEach(function (key) { /*forEach løkken løber igennem index for myMatchesarrayet og
             function(key) udføres for hvert index. (Marijn Haverbeke, 2019 p. 95) */

             
            addMatch(key._matchName, key._matchImage, key._quantity);
        })

    }

}


//addMatch sørger for at tiløje matchet med tilhørende info til siden My Matches
function addMatch(title, imageSrc, quantity) {
    var matchRow = document.createElement('div');
    matchRow.classList.add('match-row'); //vi bruger CSS stilen 'match-row'for div elementet matchRow
    var matchItems = document.getElementsByClassName('match-items')[0]; /*vi vil senere tilføje en række til  div sektionen 'match-items'
    hvor de valgte personer listes */
    var matchTitleNames = matchItems.getElementsByClassName('match-item-title');


//Generer html-indholdet til en linje med det valgte match, (Web Dev Simplified - youtube, 2018)
    // laver en knap til at fjerne matchet fra matchlisten
    let matchRowContents = `   
        <div class="match-items match-column">
            <img class="match-name-image" src="${imageSrc}" width="100" height="100">
            <span class="match-name">${title}</span>
                   
        </div>
    
        <div class="match-quantity cart-column">
            <input class="match-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

  matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
    matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
    //De næste to linjer Sørger for at henholdsvis removeCartItem og quantityChanged funktionerne kaldes når der trykkes på de to knapper
    matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatch);
    matchRow.getElementsByClassName('match-quantity-input')[0].addEventListener('change', quantityChanged);
    //Sørg for at ’change’ knappen initialiseres til den sidst valge quantity værdi
    var quantityElement = matchRow.getElementsByClassName('match-quantity-input')[0];
    quantityElement.value = quantity;
}

//funktion for at fjerne et match fra både HTML siden og arrayet i local storage 
function removeMatch(event) {
    var buttonClicked = event.target; //ved button.clicked refereres der til den aktuelle element, som skal fjernes
    //Få fat i den aktuelle række, hvor ”remove” knappen er blevet aktiveret
    var pickedMatchRow = buttonClicked.parentElement.parentElement;
    //De næste to linjer udtrækker match navnet (titleElement.innerText) fra den aktuelle række
    var titleElement = pickedMatchRow.getElementsByClassName('match-items')[0];
    var title = titleElement.innerText;
    buttonClicked.parentElement.parentElement.remove(); // fjerner den aktuelle html række, for det produkt, som brugeren ønskede fjernet.


    /*Udover at fjerne produktet på html siden skal vi også fjerne produktet fra match listen,
    som er gemt som ”likes” på localStorage. Vi finder det object, som svarer til matchnavnet
     og fjerner det fra localstorage ved at udskifte arrayed i localStorage med et nyt array, hvor produktet er fjernet */
   var myMatches = JSON.parse(localStorage.getItem("likes"));
    var i;
    for (i = 0; i < myMatches.length; i++) {
        if (myMatches[i]._matchName === title){
            myMatches.splice(i,1); /*der slettes et element ved position index i myMatches arrayet,
            så det pågældende element også slettes fra localStorage: inspireret fra (Stack Overflow Spice, 2016) og  (W3schools splice, 2019)*/
          
            localStorage.setItem("likes", JSON.stringify(myMatches));
            break 
        }
        

    }

}

/* code review: Praktisk set vil det være smart, hvis metoderne der bruges i myMatches.js hørte til en klasse.
 Dette vil være nyttigt, da den resterende del af programmet af opdelt i units via klasser.
 Derfor vil det ogå giv god mening, at etablerer en klasse for my matches. */


 //quantityChanged funktionen sørger for at brugeren kan ændre quantity værdien for det enkelte produkt hørende til en given html række.
function quantityChanged(event) {

    var buttonClicked = event.target;
    var pickedMatchRow = buttonClicked.parentElement.parentElement;
    var titleElement = pickedMatchRow.getElementsByClassName('match-item')[0];
    var title = titleElement.innerText;

    //Hvis brugeren skriver en ikke numerisk værdi eller værdien er mindre end 1, sættet stk. antallet til 1
    if (isNaN(buttonClicked.value) || buttonClicked.value <= 0) {
        buttonClicked.value = 1 // quantity kan ikke blive mindre end 1
    }

    //Vi skal sørge for at quantity-værdien gemt i local storage modsvarer “change” værdien på html siden.
    var myMatches = JSON.parse(localStorage.getItem("likes"));
    var i;
    //Indlæst shoppingliste fra ‘cart’ på localStorage og find det aktuelle produkt og størrelse. Opdater quantity værdien for produktet
    for (i = 0; i < myMatches.length; i++) {
        if (myMatches[i]._matchName === title){
            myMatches[i]._quantity = parseInt(buttonClicked.value);//the buttonClickedValue er en string, som konverteres til integer pga. parseINT
            localStorage.setItem("likes", JSON.stringify(myMatches)); // værdien for quantity gemmes i localStorage
            break
        }

    }
   
}
