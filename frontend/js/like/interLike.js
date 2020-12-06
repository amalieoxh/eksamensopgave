
//benytter inline HTML 
'div class="singleMatchContainer">'

//henter det array i localstorage som blev oprettet i potentialLikes.js
//Dette item definere, hvem der er blevet trykket på og herved hvilken profil der skal vises 
var match = JSON.parse(localStorage.getItem('founduser'));

//variabel som indhenter matchContainer i HTMLfilen 
var matchContainer = document.getElementById('match');
// der laves enn container , hvori det valgte match bliver vist med tilhørende information
var container = document.createElement('container');

// Her bliver de forskellige properties fra klassen udvalgt og kan displayes på siden 
container.className = "container";


// displayer matchnavnet 
container.innerHTML += '<div class="matchName">' + match.username + '</div>';
// displayer mathalderen
container.innerHTML += '<div class="matchAge">' + 'Age:' +match.age + '</div>';
// displayer matchbeskrivelsen 
container.innerHTML += '<div class="matchDescription">' + match.description + '</div>';
// ligesom linjen herover, skal man kunne se alle oplysninger om brugeren, som er relevant for et match.


// tager Child af matchContainer 
matchContainer.appendChild(container);

//Add A Like button, som gør at detaljerne fra det valgte match kan videreføres til like.js
var addALike = '<button type="button" onclick="addToLike()" class ="addALikeBtn">Like';
container.innerHTML += addALike;


 // Ved at sætte noget ind i input feltet på html siden, og trykke submit, gemmes dataen i en JSON fil. 
function addToLike() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    console.log("hej")

   //henter den bruger der er logget ind og den bruger, der bliver liket 
   let foundUser = JSON.parse(localStorage.getItem("founduser"))
   console.log(foundUser)
   let currentUser = JSON.parse(localStorage.getItem("currentUser"))
   console.log(currentUser)

    // Definere det objekt, som skal sendes tilbage til API'et heri skal der være den bruger der udføre liket og den bruger der likes
    //Pusher current user ind på likesarray indeks 0, og herefter den der likes på indeks 1 
    var likes = {
        username : currentUser.username,
        likedUser : foundUser.username
    }
   

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
        if (respo.err == 'Failed'){
            
        }
    }
    });

    // Angiver hvilket HTTP request, der arbejdes med, hvor i likes objektet sendes tilbage til API'et 
    xhr.open("POST", "http://localhost:5000/interMatch", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    //sendes liket tilbage til serveren 
    xhr.send(JSON.stringify(likes));

}


//Dislike knap 
var disLike = '<button type="button" class ="disLikeBtn" onclick="addDislikes()">Dislike';
container.innerHTML += disLike;

//laver samme stryktur som ved like knappen 
function addDislikes() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"

    //Definere den bruger der likes (foundUser) og den bruger der foretager liket (currentUser)
    let foundUser = JSON.parse(localStorage.getItem("founduser"))
    console.log(foundUser)
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)

    // Pusher current user ind på likesarray indeks 0, og herefter den der likes
    var disLikes = {
        username : currentUser.username,
        disLikedUser : foundUser.username
    }
  
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        const respo = this.response 
        console.log(respo); //Til at se, om request kommer tilbage
        if (respo.err == 'Failed'){
            
        }
    
    }
    });

    // Angiver hvilket HTTP request, der arbejdes med, hvor i dislikes objektet sendes tilbage til API'et 
    xhr.open("POST", "http://localhost:5000/interMatchDis", true);

    // definerer at det er en JSON-fil der skal arbejdes med
    xhr.setRequestHeader("Content-Type", "application/json");

    //sendes liket tilbage til serveren 
    xhr.send(JSON.stringify(disLikes));

}

 // window.location: returns the href (URL) of the current page




'</div>'
