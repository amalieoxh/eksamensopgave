

class matchList {
    // constructor properties
    constructor() {
        this.match_list = [] ;
        this.matchAmount ;
    }
    // Methods
  matchListFromLocalStorage() {
       this.match_list = JSON.parse(localStorage.getItem("likes"));
   }

newAddMatch(title, imageSrc){
        var title =  match_list[i]._matchName;
        var imageSrc = match_list[i]._matchImage;
    }

   addMatchToHTML(){
       for ( let i=0 ; i < this.match_list.length; i++)
       {
          this.newAddMatch(this.match_list[i])
       }

    
  

        var matchRow = document.createElement('div')
        matchRow.classList.add('match-row') //vi bruger CSS stilen 'match-row'for div elementet matchRow
        var matchItems = document.getElementsByClassName('match-items')[0] //vi vil senere tilføje en række til  div sektionen 'match-items' hvor de valgte personer listes
        var matchTitleNames = matchItems.getElementsByClassName('match-item-title')
        for (var i = 0; i < matchTitleNames.length; i++) {
            if (matchTitleNames[i].innerText == title) {
            }
        }

//Generer html-indholdet til en linje med den valgte person (skal indeholde billede)
        // lav også en knap til at fjerne personen fra matchlisten
        let matchRowContents = `   
        <div class="match-item match-column">
            <img class="match-item-image" src="${imageSrc}" width="100" height="100">
            <span class="match-item-title">${title}</span>
                   
        </div>
        <div class="match-quantity match-column">
            <input class="match-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        matchRow.innerHTML = matchRowContents; //html koden indeholdt i matchRowContents variablen indøres i elementet matchRow
        matchItems.append(matchRow) //matchRow tilføjes til sektionen matchItems på html siden
        //Sørg for at henholdsvis removeMatchItem og quantityChanged funktionerne kaldes når der trykkes på de to knapper
        matchRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeMatchItem)
        matchRow.getElementsByClassName('match-quantity-input')[0].addEventListener('change', quantityChanged)
        var quantityElement = matchRow.getElementsByClassName('match-quantity-input')[0]
        quantityElement.value = quantity;
    }

}

