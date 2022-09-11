/* import fonction  */
import {photographerFactory} from "../factories/photographer.js";
/* import class  */
import MediaFactory from "../factories/mediaFactory.js";


/* Création de toutes les cards individuellement par la fonction photographerFactory qui se
 trouve dans photographer.js et affichage dans la section photographer_section */
 export async function displayData(photographers) {
    /*  Récupération de la section où seront affichées les cards */
   const photographersSection = document.querySelector(".photographer_section");
   /* userCardDOM = chaine de caractères qui va contenir le code HTML d'une card 
      par la fonction photographerFactory pour chaque appel */
   let userCardDOM = "";
   photographers.forEach((photographer) => {
       /* pour récupérer du bloc article de chaque photographe */        
       userCardDOM += photographerFactory(photographer); 
   });       
   /* Affichage de toutes les cards dans la section photographersSection */
   photographersSection.innerHTML = userCardDOM;
};

export function getUrl(){
    /* récupère l'Id dans l'url */
    let params = (new URL(document.location)).searchParams;
    let identity = parseInt(params.get('id'));
   /* console.log("id photographe:",identity); */
    return identity;
}

/* récupérer et affichager les données de chaque Id photographe dans l'en-tête   */
export function displayHeaderPhotograph(data, idPhotographer){
    const photographer = data.filter(photograph => photograph.id == idPhotographer);
    const { name, portrait, city, country, tagline } = photographer[0];
    const divData = document.getElementById("photograph-data");
    const divPicture = document.getElementById("photograph-picture");
    divData.innerHTML = `
        <h1 class="firstName">${name}</h1>
        <p class="location bold">${city}, ${country}</p>
        <p>${tagline}</p>`;
    divPicture.innerHTML = `<img src="./assets/images/Photographers_ID_photos/${portrait}"
                             class="portrait" alt="${name}">`;
}


/* paramètres : les medias du photographe, son prénom et le trie selectionné */
export function displayMedia(medias, firstName, sortBy,){
    /* bloc pour afficher les médias */
    const divMedias = document.getElementById("medias"); 
    let articlesList = ""; /*code HTML pour les articles medias*/
    let sortedMedias = null; /* tableau pour les médias triés */
    let temporary = null; /* stockage tempaire pour l'ordre de trie  */
    let currentParent = null; /* Contiendra l'id de l'élément parent 
    du tri sélectionné pour inverser l'ordre des options */

    switch (sortBy) {
        /* Tri décroissant sur les likes du média.
        IL faut inverser les opérateurs de comparaison pour passer en tri croissant */
        case "Likes":
            sortedMedias = medias.sort(function(a, b) {
                if (a.likes < b.likes) {
                    return 1;
                } else if(a.likes > b.likes){
                    return -1;
                }else{
                    return 0; /* pas de tri */
                }
            });
            currentParent = document.getElementById("btnSortLikes").parentElement.id;
            break;

        /* Tri décroissant sur la date du média */
        case "Date":
            sortedMedias = medias.sort(function(a, b) {
                a = new Date(a.date);
                b = new Date(b.date);
                if (a < b) {
                    return 1;
                } else if(a > b){
                    return -1;
                }else{
                    return 0; /* pas de tri */
                }
            });
            currentParent = document.getElementById("btnSortDate").parentElement.id;
            break;

        /* Tri croissant nom média*/
        case "Title":
            sortedMedias = medias.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                } else if(a.title < b.title){
                    return -1;
                }else{
                    return 0; /* pas de tri */
                }
            });
            currentParent = document.getElementById("btnSortTitle").parentElement.id;
            break;
            
        /* défaut tri décroissant like */
        default:
            sortedMedias = medias.sort(function(a, b) {
                if (a.likes < b.likes) {
                    return 1;
                } else if(a.likes > b.likes){
                    return -1;
                }else{
                    return 0; /* pas de tri */
                }
            });
            currentParent = document.getElementById("btnSortLikes").parentElement.id;
            break;
    }

   // console.log("currentParent:",currentParent);

    /*  liste de tri de temporaire */
    temporary = document.getElementById("firstSort").innerHTML;
    document.getElementById("firstSort").innerHTML = document.getElementById(currentParent).innerHTML;
    document.getElementById(currentParent).innerHTML = temporary;

    /*ecoute évenement clic pour les fonctions de tries */
    document.getElementById("btnSortLikes").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Likes");
    });
    document.getElementById("btnSortDate").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Date");
    });
    document.getElementById("btnSortTitle").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Title");
    });

    
    /* cartes médias  */
    for (const mediaItem of sortedMedias) {
        let mediaCard = new MediaFactory(mediaItem, firstName);   
        articlesList += mediaCard.article;
    }
    /* Affichage des cartes dans le bloc médias */
    divMedias.innerHTML = articlesList;    
}

/* paramètres : les médias, prix par jour et Id du photographe  */
export function displayPrice(medias, price, id){
    /*  mes medias du photographes */
    const mediasList = medias.filter(media => media.photographerId == id);
    /*  variable Dom*/
    let content = document.getElementById("priceLikes");
    /* initialer le compteur */
    let likesCount = 0;
    /*  incrémenter les likes de chaque media */
    for (const media of mediasList) {
        likesCount += media.likes;
    }
    /* bloc prix et like, utilisation icône fontawesome coeur */
    content.innerHTML = `<div id="countLikes">
                            <p>${likesCount}</p>
                            <i class="fa-solid fa-heart"></i>
                        </div> 
                        <p>${price}€ / jour</p>`;
}


/* gestion de l'affichage menu trie  */
 export function displayMenuFilters(){
    /* flèche haut */
    document.querySelector("#arrowUp").classList.toggle('visible');
    document.querySelector("#arrowUp").classList.toggle('hidden');
    /* flèche bas */
    document.querySelector("#arrowDown").classList.toggle('visible');
    document.querySelector("#arrowDown").classList.toggle('hidden');
    /* focus sur la flèche qui est visible  */
    if(document.querySelector("#arrowDown").classList.contains("visible")){
        document.getElementById("arrowDown").focus();
    }else{
        document.getElementById("arrowUp").focus();
    }
    /* bouton menu*/
    document.querySelector("#secondSort").classList.toggle('visible');
    document.querySelector("#secondSort").classList.toggle('hidden');
    document.querySelector("#thirdSort").classList.toggle('visible');
    document.querySelector("#thirdSort").classList.toggle('hidden');
}


/* imcrémenter du nombre de like  */
export function addLike(){
    /*récupère le nombre de like indiqué à coté du coeur cliqué et
    le stock dans une variable  */
    let current = parseInt(this.firstElementChild.innerText);
    this.firstElementChild.innerText = current + 1;
    /* suppression de l'évènement du click pour ajouter un like */
    this.removeEventListener("click", addLike);
    /* ajout de l'évènement du click pour soustraire un like */
    this.addEventListener("click", removeLike);
    /* Incrémenter le total de likes(bas de page) */
    let currentTotal = parseInt(document.getElementById("countLikes").firstElementChild.innerText);
    /*afficher le nombre total de like  */
    document.getElementById("countLikes").firstElementChild.innerText = currentTotal + 1;
}
/* décrémenter du nombre de like  */
function removeLike(){
    /*récupère le nombre de like indiqué à coté du coeur cliqué et
    le stock dans une variable  */
    let current = parseInt(this.firstElementChild.innerText);
    this.firstElementChild.innerText = current - 1;
     /* suppression de l'évènement du click pour soustraire un like */
    this.removeEventListener("click", removeLike);
    /* ajouter de l'évènement du click pour ajouter un like */
    this.addEventListener("click", addLike);
    /* Incrémenter le total de likes(bas de page) */
    let currentTotal = parseInt(document.getElementById("countLikes").firstElementChild.innerText);
     /*afficher le nombre total de like  */
    document.getElementById("countLikes").firstElementChild.innerText = currentTotal - 1;
}