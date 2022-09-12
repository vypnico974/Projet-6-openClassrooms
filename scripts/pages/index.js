/*  imports fonctions */
import {getPhotographers} from "../utils/dataConnection.js";
import{displayData} from "../utils/userInterface.js";


/* Chargement des données et affichage des cartes au chargement de la page */
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
};
/* affichage page  */
init();
    