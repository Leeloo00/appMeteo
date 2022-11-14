const APIKEY = 'a72dac462c18aa2d30ef5807a95ff440';
const erreur = document.getElementById('erreur');
const container = document.getElementById('container');
const img = document.createElement('img');
const card = document.getElementById('cartMeteo');


/*Appel à l'API avec ville en paramère de fonction*/
let apiCall = function(city){

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${APIKEY}&units=metric`; 

    // J'éxute ma méthode fetch . then pour récuperer la response je la traite pour l'avoir en json uqand je l'ai formaté en json je refait un .then pour récupérer la nouvelle promesse je récupère les data je les affiche premièrement en console.log
    fetch(url).then((response) => 
    response.json().then((data) => {

        console.log(data)

            document.getElementById('name').innerHTML = data.name;
            document.getElementById('temps').innerHTML = data.main.temp + "°c";
            document.getElementById('weather').innerHTML = data.weather[0].description;
            document.getElementById('min').innerHTML = "Min : "+ data.main.temp_min + "°c" ;
            document.getElementById('max').innerHTML = "Max : "+ data.main.temp_max + "°c";
            document.getElementById('wind').innerHTML = Math.round(data.wind.speed*2.1) + 'km/h';
            document.getElementById('humidity').innerHTML = data.main.humidity + '%';

            
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
            card.style.display = "block";
            erreur.innerHTML = "";
            apiCall(city);

        }else{
            erreur.innerHTML = 'Il n\'y a pas de ville à ce nom';
            card.style.display = "none";
            img.remove()
        }
    }))
})

// Appel par défaut au chargement de la page
apiCall('Paris');


