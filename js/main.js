const urlApi = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=954ada82beb1cba44ac79c38d73c2709&hash=3c3b8a4e06c2f90665c5c670f63acdbd&name=";
const characterList = document.querySelector("#characterList");
const searchButton = document.querySelector("#search");
const searchInput = document.getElementById("characterSelect");


class RequestMarvel{
    
    get(urlApi){
        
        return new Promise((resolve,reject) => {
            
            fetch(urlApi)
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
    marvel.get(urlApi+searchKey)
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
                                    <p class="text-secondary">Veriler developer.marvel'dan alınmıştır.</p>
                                </div>
                            </div>

                           </div>
                        </div>

                       </div>

                       <div class="comics">
                           <h1>Comics</h1>
                           <hr>
                           <div class="row">
                               <div class="col-lg-4">
                                   <div class="comicsImg">
                                       <img src="img/MarvelLogo.svg" width="100%" alt="">
                                       <h3>Başlık</h3>
                                       <p>icerik</p>
                                   </div>
                               </div>
                               <div class="col-lg-4">fas</div>
                               <div class="col-lg-4">fas</div>
                           </div>
                       </div>            
            `;
            console.log(heros);
        })
    })
    .catch(err => console.log(err));
}

