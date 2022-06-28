function showUsers() {
  // initialisation requête
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://reqres.in/api/users?page=1');

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.status === 200) {
        // met les données sous forme d'objet
        const object = JSON.parse(xhr.response)

        let myHtml = ""
        let image = ""
        // pour chaque element avec intitulé first_name contenu dans object
        object.data.forEach(element => {
          myHtml += '<div class="card col-6" style="width: 18rem; display: flex;" ><img src= ' + element.avatar + '> <h5>' + element.first_name + ' ' + element.last_name + '</h5><p>'+element.email+'</p></div>'
          console.log(element.avatar)
        });

        document.getElementById('allUtilisateurs').innerHTML = myHtml
        // document.getElementById('imageAllUsers').src = image
        console.log("Response = " + xhr.response);
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