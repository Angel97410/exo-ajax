function showUsers() {
  // initialisation requête
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://reqres.in/api/users?page=2');

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if(xhr.status === 200){
        
        console.log("Response = " + xhr.response);
      }else if (xhr.status === 400){
        alert("Impossible de trouver l'url de la requête AJAX")
      }else{
        alert("Une erreur est survenue")
      }
    };
  });

  // envoie de la requête
  xhr.send();
}