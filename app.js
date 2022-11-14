const APIKEY = 'a72dac462c18aa2d30ef5807a95ff440';
const erreur = document.getElementById('erreur');
const container = document.getElementById('container');


/*Appel à l'API avec ville en paramère de fonction*/
let apiCall = function(city){

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${APIKEY}&units=metric`; 

    // J'éxute ma méthode fetch . then pour récuperer la response je la traite pour l'avoir en json uqand je l'ai formaté en json je refait un .then pour récupérer la nouvelle promesse je récupère les data je les affiche premièrement en console.log
    fetch(url).then((response) => 
    response.json().then((data) => {

    

            document.getElementById('name').innerHTML = data.name;
            document.getElementById('temps').innerHTML = data.main.temp;
            document.getElementById('weather').innerHTML = data.weather[0].description;
            document.getElementById('min').innerHTML = "Min : "+ data.main.temp_min ;
            document.getElementById('max').innerHTML = "Max : "+ data.main.temp_max ;
            document.getElementById('wind').innerHTML = data.wind.gust + 'km/h';
            document.getElementById('humidity').innerHTML = data.main.humidity + '%';

            var img = document.createElement('img');
            img.src= 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png';
            document.getElementById('icon').appendChild(img);
            img.style.width = '100px';

        })

    ).catch(err => console.log('Erreur :' + err));

    }


/*Ecouteur d'évènement sur la soumission du formulaire*/
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    let city = document.querySelector('#cityname').value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${APIKEY}&units=metric`; 

    fetch(url).then((response)=>
    response.json().then((data)=>{
        console.log(data.name, 'je suis dans la fonction');
        

        // Je met une condition si la ville existe tout va bien sinon on supprime la carte et on laisse un message
        if(data.name){

            container.style.display = "block";
            erreur.innerHTML = "";
            apiCall(city);

        }else{
            erreur.innerHTML = 'il n\'y a pas de ville de ce nom';
            container.style.display = "none";
        }

}))
})

// Appel par défaut au chargement de la page
apiCall('Paris');


