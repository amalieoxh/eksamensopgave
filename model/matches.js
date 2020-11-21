
//henter matchescontainer fra HTMLfilen */
var matchesContainer = document.getElementById('matchesContainer');

// for-loopet som tager arrayet og looper gennem matches
for(var i=0; i<matches.length; i++){

// variabel en div genenem variablen match, herved simplificeres HTML 
   var match = document.createElement('div');

   // Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
   match.className = "match";
   
   /* displayer image */
   match.innerHTML = '<img class="match_img" src=' + matches[i]._matchImage + ' onClick="interMatch('+matches[i]._matchId+')">';
   // displayer navnet på det eventuelle match 
   match.innerHTML += '<div class="matchName">' + matches[i]._matchName + '</div>';
   // tager Child af matchescontainer
   matchesContainer.appendChild(match);
}

//Her laves en funktion som bliver kaldt onclick ved at trykke på billedet. Funktionen skifter URL.

function interMatch (matchId) {
   window.location.replace('interMatch.html?matchId='+matchId);
}

