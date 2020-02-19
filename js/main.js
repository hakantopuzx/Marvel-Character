const urlApi = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=954ada82beb1cba44ac79c38d73c2709&hash=3c3b8a4e06c2f90665c5c670f63acdbd&name=";
const urlApiComics = "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=954ada82beb1cba44ac79c38d73c2709&hash=3c3b8a4e06c2f90665c5c670f63acdbd&title=";

const characterList = document.querySelector("#characterList");
const comicsList = document.querySelector("#comics");

const searchButton = document.querySelector("#search");
const searchInput = document.getElementById("characterSelect");
const comicsTitle = document.querySelector("#comicsTitle");


class RequestMarvel{
    
    getCharacter(urlApi){
        
        return new Promise((resolve,reject) => {
            
            fetch(urlApi)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        });
    };

    getComics(urlApiComics){

       return new Promise((resolve,reject) => {

            fetch(urlApiComics)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
       });
    };
     
};


const marvel = new RequestMarvel();

searchButton.addEventListener("click",searchChamp)


function searchChamp(){
    let searchKey = searchInput.value;
    marvel.getCharacter(urlApi+searchKey)
    .then(hero => {
        const heroes = hero.data.results;
        heroes.forEach(heros => {
            characterList.innerHTML += `

            <div class="characterDetail">
                        <h1>Karakter</h1>
                        <hr>
                        <div class="detailParent">
                           <div class="row">

                            <div class="col-lg-5">
                                <div class="characterPoster">
                                <img src="${heros.thumbnail.path}.${heros.thumbnail.extension}" alt="${heros.name}" title="${heros.name}">
                                </div>
                            </div>

                            <div class="col-lg-7">
                                <div class="details">
                                    <h2>${heros.name}</h2>
                                    <p>${heros.description}</p>
                                    <p class="text-secondary">Comics: ${heros.comics.available} | Series: ${heros.series.available} | Stories: ${heros.stories.available} | Events: ${heros.events.available}</p>
                                    <p class="text-secondary">${hero.attributionText}</p>
                                </div>
                            </div>

                           </div>
                        </div>
                </div>`;
            console.log(heros);
        })
    })
    .catch(err => console.log(err));


    marvel.getComics(urlApiComics+searchKey)
    .then(comics => {
        const allComics = comics.data.results;
        allComics.forEach(comic => {
            const characters = comic.characters.items; 
            var characterName="";
            characters.forEach(character => {
                characterName += character.name + ", ";
            });
             
            comicsList.innerHTML += `
            <div class="col-lg-4">
                <div class="comicsParent">
                    <div class="comicsImg">
                        <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" title="${comic.title}">
                        <h3>${comic.title}</h3>
                         <p>${comic.description == null ? " " : comic.description}</p>
                         <p class="text-secondary">${characters.length == 0 ? " " : 'Karakter: ' + characterName}</p>
                         <p class="footer">${comics.attributionText}</p>
                         
                    </div>
                </div>
            </div>     

            `;
            document.getElementById("comicsTitle").style.display = "block";
            console.log(allComics)
            
        })
        
    })
    .catch(err => console.log(err))

}

