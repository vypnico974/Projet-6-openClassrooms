/* imports fonctions  */
import {getPhotographers} from "../utils/dataConnection.js";
import {getMedia} from "../utils/dataConnection.js";
import {getUrl} from "../utils/userInterface.js";
import {displayHeaderPhotograph} from "../utils/userInterface.js";
import {displayMedia} from "../utils/userInterface.js";
import {displayPrice} from "../utils/userInterface.js";
import {displayMenuFilters} from "../utils/userInterface.js";
import {addLike} from "../utils/userInterface.js";

/* import class  */
import Lightbox from "../utils/lightBox.js"


async function initPage(){    
    /* Id du photographge via l'URL */ 
    let identity = getUrl();
    /* données photographe et médias du photographe(id) */
    const photographData = await getPhotographers();
    const mediaData = await getMedia();
    /* prénom et prix du photographe */
     const photographer = photographData.filter(photograph => photograph.id == identity);
     /* pour le répertoires des médias  */
     const firstName = photographer[0].name.split(' ')[0];
     const price = photographer[0].price;  
     /* Filtrage des medias */
     const photographerMedias = mediaData.filter(media => media.photographerId == identity)
    /*lightbox*/
    let lightbox = null;
    lightbox = new Lightbox(photographerMedias, firstName);    
    //console.log("les médias :",photographerMedias );

     /* affichage en-tête du photographe , ces médias,  like et prix  */
     displayHeaderPhotograph(photographData, identity);
     displayMedia(photographerMedias, firstName, null, lightbox);
     displayPrice(photographerMedias, price, identity);


    /*écoute évènement clic menu filtre par la flèche  étendre/réduire */
    document.querySelector("#arrowDown").addEventListener("click", displayMenuFilters);
    document.querySelector("#arrowUp").addEventListener("click", displayMenuFilters);
     /*écoute évènement clic menu filtre par la flèche  étendre/réduire */
    document.querySelector("#arrowDown").addEventListener("click", displayMenuFilters);
    document.querySelector("#arrowUp").addEventListener("click", displayMenuFilters);
    /*écoute évènement touche entrée clavier(Keycode 13) pour étendre/réduire 
    le menu des filtres  par les icônes flèches haut et bas*/
    document.querySelector("#arrowDown").addEventListener("keyup", (e) =>{
        if (e.keyCode == "13"){
            displayMenuFilters();
        }
    });
    document.querySelector("#arrowUp").addEventListener("keyup", (e) =>{
        if (e.keyCode == "13"){
            displayMenuFilters();
        }
    });                  
    /* écoute évènement clic icône coeurs de chaque cartes  pour incrémenter le nombre
    total de like  */
    let listDivLike = document.querySelectorAll("div.totalLikes");
    for (const like of listDivLike) {
        like.addEventListener("click", addLike);
    }  
}

/* affichage page */
initPage();



