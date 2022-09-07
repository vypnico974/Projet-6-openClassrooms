import {photographerFactory} from "../factories/photographer.js";

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
        <p class="smallSpacing">${tagline}</p>`;
        
    divPicture.innerHTML = `<img src="./assets/images/Photographers_ID_photos/${portrait}" class="portrait" alt="${name}">`;

   // console.log("div:",divPicture);
}

