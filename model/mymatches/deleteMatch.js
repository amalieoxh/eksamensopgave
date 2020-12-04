
document.addEventListener("DOMContentLoaded", function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    let findingMatches; 


    xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
          var findingMatches = this.response;
          console.log(findingMatches)

          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
            console.log(currentUser)
        
            var delete123 = getElementsByClassName('btn-danger')[0].addEventListener('click', function() {

            // for-loop which loops through the matches
                for(var i=0; i< findingMatches.length; i++){
                    for(var j=0; j < findingMatches.length; j++){
                        if (currentUser.username === findingMatches[i].username 
                            && 
                            findingMatches[i].username === findingMatches[j].likedUser 
                            && 
                            findingMatches[i].likedUser === findingMatches[j].username ){
                            console.log(findingMatches[i].likedUser)  
                                

                        } 
                    } 
                }
            })
        }
    })

    xhr.open("DELETE", "http://localhost:2500/deleteMatch", true);
        
    xhr.setRequestHeader("Content-Type", "application/json");
        
    xhr.send(findingMatches);
})