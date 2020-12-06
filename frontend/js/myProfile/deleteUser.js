
//oprettere en variabel for delete knappen 
deleteUser = document.getElementById("deleteBtn")    

//benytter axious for at simplificere koden 
deleteUser.addEventListener('click', function() {
        //
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))   
        //henviser til delete-requested fra serveren, hvor currentUser filtreres fra og sendes tilbage til JSON filen              
        axios.delete("http://localhost:5000/deleteUser", {
                data: currentUser
        })
        .then(response=>{
                console.log(response.data)
        })                
})

