
function login () {
    var createdUser = JSON.parse(localStorage.getItem('User'));
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Tjekker om indsatte detaljer matcher stored details. 
    for (let i=0; i<createdUser.length; i++) {
        if (username ===createdUser[i].userName && password == createdUser[i].password){
            
            //CurrentUser skal vise brugeroplysningerne på den bruger, som logger ind
            localStorage.setItem('currentUser', JSON.stringify(createdUser[i]));
            location.href = "loggedIn.html";
            
             // hvis brugeroplysningerne er korrekte returneres at brugeren er inde
            alert("You are logged in");
            return true;
        }
    }

   //hvis oplsyningerne er forkerte returneres nedenstående fejlmeddelelse
    alert("Wrong username or password. If you don't have an account, please sign in");
}

//benytter en eventlistener ved signIn, default benyttes, så den ikke konstant refresher, men kommer videre til at funktionen kaldes
document.getElementById('signIn').addEventListener('click', function (event) {
    event.preventDefault();
    login();
});

