


//URL SearchParams. Dette er den måde hvorpå når der trykkes på et billede i shopsiden bliver man sendt til det pågældende produktsside
//Vi bruger en indbygget klasse der hedder URLSearchParams, som giver muligheden for at hente query-parameteren 'productId'.

var urlParams = new URLSearchParams(location.search);
var matchId = urlParams.get("matchId");

//Fundamentet for at finde det rigtige produkt, som der er klikket på. Her er der forekommet en refakturering. Således at den går fra at benytte matches[i]
// overalt, til at benytte den funktion istedet. nedsat kompleksitet, øget læsbarhed, rykket en logik som stod flere steder til et(centralisering)
var match = findMatch(matchId);

// DOM - kommenter på valget af måde for udførsel af DOM. Dynamisk.
/* variabel som indhenter productsContainer i HTMLfilen */
var matchContainer = document.getElementById('match');
// der laves enn container , hvori det valgte match bliver vist med tilhørende information
var container = document.createElement('container');

/* Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden */
container.className = "container";

/* displayer image */
container.innerHTML = '<img class="match_img" src=' + match._matchImage + ' onClick ="interMatch"(' + match._matchId + ')">';
/* displayer produktnavnet */
container.innerHTML += '<div class="matchName">' + match._matchName + '</div>';

/* Add to cart button, som gør at detaljerne fra det valgte produkt kan videreføres til shoppingcart*/
var addALike = '<button type="button" class ="addALikeBtn" onclick="addToMylikes()">Like';
container.innerHTML += addALike;

/*displayer beskrivelsen*/
container.innerHTML += '<div class="matchDescription"> Description: ' + match._matchDescription + '</div>';

/* tager Child af matchContainer */
matchContainer.appendChild(container);

//
function addToMylikes() {
    var matchToLike = match;

    //Hent vores nuværende matches fra localstorage
    //Hvis der ikke er nogen cart, så sikrer den at det er et tomt array.
    var likes = localStorage.getItem('likes');
    if (likes == null) {
        likes = [];
    } else {
        likes = JSON.parse(likes);
    }

    //tjekker om identitisk match er tilføjet, således den ikke popper op dobbelt. Da der ikke er modificeret i likes bunken til
    //at kunne tage i imod flere af samme og stacke.
    /*  code review: Man kan ikke tilføje et match flere gange, hvilket ikke er helt optimalt, da man skal have mulighed
    for at tilføje flere identiske matches til kurven, således de stacker */

    var chosenMatches = JSON.parse(localStorage.getItem("likes"));
    var i;
    var  matchAlreadySelected = false;
    for (i = 0; i < likes.length; i++) {
        if (likes[i]._matchName === matchToLike._matchName){
            alert('You have already liked this person');
            matchAlreadySelected = true;
            break
        }
    }
    if (matchAlreadySelected === false) {
        alert('A pottential match has been added to your likes. Wait and see if the person likes you');
        likes.push(matchToLike);
        localStorage.setItem('likes', JSON.stringify(likes));
    }

}


// code review: Ifølge objektorienteret programmering, kunne denne funktion have sin egen fil

function findMatch(matchId) {
    for (var i = 0; i < matches.length; i++) {
        if (matches[i]._matchId == matchId) {
            return matches[i];
        }
    }
}