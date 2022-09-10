/* imorts fonctions  */
import {getPhotographers} from "../utils/dataEnter.js";
import {getMedia} from "../utils/dataEnter.js";
import {getUrl} from "../utils/ui.js";
import {displayHeaderPhotograph} from "../utils/ui.js";
import {displayMedia} from "../utils/ui.js";
import {displayPrice} from "../utils/ui.js";
import {displayMenuFilters} from "../utils/ui.js";

async function initPage(){
    // Récupération de l'ID du photographge via l'URL   
    let identity = getUrl();
    // Chargement des données photographe et médiass de cet id
    const photographData = await getPhotographers();
    const mediaData = await getMedia();
     // Récupération du prénom et prix du photographe
     const photographer = photographData.filter(photograph => photograph.id == identity);
     /* nécessaire uniquement le nom pour le répertoires des médias  */
     const firstName = photographer[0].name.split(' ')[0];
     const price = photographer[0].price;
    // console.log("data un photographe:",photographer);

     /* Filtrage des medias */
     const photographerMedias = mediaData.filter(media => media.photographerId == identity)

     console.log("les médias :",photographerMedias );

     displayHeaderPhotograph(photographData, identity);
     displayMedia(photographerMedias, firstName, null);
     displayPrice(photographerMedias, price, identity);


    /* Gestion du clic sur la flèche pour étendre/réduire la liste de filtres */
    document.querySelector("#arrowDown").addEventListener("click", displayMenuFilters);
    document.querySelector("#arrowUp").addEventListener("click", displayMenuFilters);
     

}

initPage();



