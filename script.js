// --------------------------------------FONCTION RECUPERE LE NUMERO DE PAGE----------------------------------------------

function showUsers() {
  const nbPage = document.getElementById('numberPageUsers').value
  getUsers(nbPage)
};

// ---------------------------------------------------FONCTION AFFICHAGE PAGINATION -----------------------------------------------------

function getUsers(nbPage) {
  // initialisation requête
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users?page=" + nbPage
  xhr.open('GET', url);

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.status === 200) {
        // met les données récupéré sous forme d'objet
        const object = JSON.parse(xhr.response)
        setUsersInPage(object)
      } else if (xhr.status === 400) {
        alert("Impossible de trouver l'url de la requête AJAX")
      } else {
        alert("Une erreur est survenue")
      }
    };
  });

  // envoie de la requête
  xhr.send();
}

// ---------------------------------------------------FONCTION AFFICHAGE NOM + PRENOM + MAIL-----------------------------------------------

function setUsersInPage(listUsers){
  let myHtml = ""
  // pour chaque element avec intitulé first_name contenu dans object
  listUsers.data.forEach(element => {
    myHtml += '<div class="card col-6" style="width: 18rem; display: flex;" ><img src= ' + element.avatar + '> <h5>' + element.first_name + ' ' + element.last_name + '</h5><p>' + element.email + '</p></div>'
  });

  document.getElementById('allUtilisateurs').innerHTML = myHtml
  console.log("Response = " + xhr.response);
}