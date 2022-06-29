// ----------------------------------------------------- LOADER-------------------------------------------------------------------

const loader = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

// --------------------------------------FONCTION RECUPERE LE NUMERO DE PAGE----------------------------------------------
// -----------FONCTION JAMAIS APPELE------------------

// function showUsers() {
//   const nbPage = document.getElementById('numberPageUsers').value
//   getUsers(nbPage)
// };

// ---------------------------------------------------FONCTION AFFICHAGE PAGINATION -----------------------------------------------------

function getUsers(nbPage) {
  // mise en route loader pendant chargement
  document.getElementById('allUtilisateurs').innerHTML = loader
  document.getElementById('pagination').innerHTML = ''
  // initialisation requête
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users?delay=1&page=" + nbPage
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

function setUsersInPage(listUsers) {
  let myHtml = ""
  // pour chaque element avec intitulé first_name contenu dans object
  listUsers.data.forEach(element => {
    myHtml += '<div class="card col-6" style="width: 18rem; display: flex;" ><img src= ' + element.avatar + '> <h5>' + element.first_name + ' ' + element.last_name + '</h5><p>' + element.email + '</p></div>'
  });

  document.getElementById('allUtilisateurs').innerHTML = myHtml

  // Création de la pagination 
  let nbPage = listUsers.total_pages
  let currentPage = listUsers.page

  let htmlPagination = ""
  for (i = 1; i <= nbPage; i++) {
    if (i == currentPage) {
      htmlPagination += '<button class="btn active" disabled>' + i + '</button>'
    } else {
      htmlPagination += '<button class="btn" onclick= "getUsers(' + i + ')">' + i + '</button>'
    }
  }
  document.getElementById('pagination').innerHTML = htmlPagination
}

// PERMET D'OUVRIR LA PAGE DIRECTEMENT SUR PAGE 1
document.addEventListener("DOMContentLoaded", function () {
  getUsers(1)
});

// --------------------------------------------FONCTION CREATION UTILISATEUR AVEC AJAX-------------------------------------------------
function createUser() {

  // requête POST 
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users"
  xhr.open('POST', url);

  //  A ajouter obligatoirement setRequestHeader pour une méthode POST
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        // met les données récupéré sous forme d'objet
        const object = JSON.parse(xhr.response)
        console.log(object)
      } else if (xhr.status === 400) {
        alert("Impossible de trouver l'url de la requête AJAX")
      } else {
        alert("Une erreur est survenue")
      }
    };
  });
  // Créer le nouvel utilisateur (toujour reprendre ça)
  let myForm = new FormData()
  myForm.append('name', 'Marty');
  myForm.append('job', 'David');

  var object = {};
  myForm.forEach((value, key) => object[key] = value);
  var json = JSON.stringify(object);
  // Jusqu'ici 

  // envoie de la requête
  xhr.send(json);
}

// ----------------------------------------------FONCTION CREATION UTILISATEUR AVEC API FETCH-------------------------------------------------------
// -----------------------------------------------------PLUS SIMPLE COMME METHODE POST ---------------------------------------------------
function createUserApiFetch() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json")
  const body = JSON.stringify({
    name: 'David',
    job: 'Marty',
  }); //JSON.stringify pour convertir en objet JSON et éviter le risque des caractères spéciaux.

  const init = {
    method: 'POST',
    headers: headers,
    body: body
  };

  fetch('https://reqres.in/api/users', init)
    .then(response => {
      return response.json();
    })
    .then(response => {
      // console.log(response)
    })
    .catch(error => alert("Erreur : " + error));
}