import {getPhotographers} from "../utils/dataEnter.js";
import {getMedia} from "../utils/dataEnter.js";
import {getUrl} from "../utils/ui.js";
import {displayHeaderPhotograph} from "../utils/ui.js";
  

async function initPage(){
    // Récupération de l'ID du photographge via l'URL   
    let identity = getUrl();
    // Chargement des données photographe et médiass de cet id
    const photographData = await getPhotographers();
    const mediaData = await getMedia();
     // Récupération du prénom et prix du photographe
     const photographer = photographData.filter(photograph => photograph.id == identity);
     const firstName = photographer[0].name;
     const price = photographer[0].price;
    // console.log("data un photographe:",photographer);

     displayHeaderPhotograph(photographData, identity);

}

initPage();



