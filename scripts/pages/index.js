import {getPhotographers} from "../utils/dataEnter.js";
import{displayData} from "../utils/ui.js";


/* Chargement des données et affichage des cards au chargement de la page */
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
};
    
init();
    