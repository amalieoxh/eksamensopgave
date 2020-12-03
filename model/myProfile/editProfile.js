


//variabel for den bruger, som er logget ind 
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

// henter information fra min User Klasse, som blev oprettet i validation.js - formålet er at man som bruger kan se sine brugeroplysninger
document.getElementById("username").value = currentUser.username;
document.getElementById("editPhone").value = currentUser.phone;
document.getElementById("newCity").value = currentUser.city;
document.getElementById("newZip").value = currentUser.zip;
document.getElementById("newAddress").value = currentUser.address;
document.getElementById("newEmail").value = currentUser.email;
document.getElementById("newPassword").value = currentUser.password;

editUser = document.getElementById("editBtn")


editUser.addEventListener('click', retriveAndSendUpdate);

function retriveAndSendUpdate() {
  const username = document.getElementById('username');
  const phone = document.getElementById('editPhone');
  const city = document.getElementById('newCity');
  const zip = document.getElementById('newZip');
  const address = document.getElementById('newAddress');
  const email = document.getElementById('newEmail');
  const password = document.getElementById('newPassword');

  var data = {
    username: username.value,
    phone: phone.value,
    city: city.value,
    zip: zip.value,
    address: address.value,
    email: email.value,
    password: password.value,
  }

  sendUpdate(data);
}

function sendUpdate(data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json"
  xhr.addEventListener("readystatechange", processResponse);
  xhr.open("PUT", "http://localhost:2500/editProfile", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  localStorage.setItem('currentUser', JSON.stringify(data));

}

function processResponse(e) {
  if (e.readyState === 4) {
    var allUsers = e.response;
    for (i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username === username) {
        allUsers.splice(i, 1);
        console.log(allUsers)

      }
    }
  }
  alert("Your user has been updated");
  window.location.href = ("../view/userProfile.html")

}

