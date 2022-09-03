 /*  Lecture du json pour extraction des données 
     2 tabeaux dans data : media et photographers  */
async function getPhotographers() {
    const response = await fetch("./data/photographers.json")
    /* attendre la résolution de la promesse  */
    const data = await response.json();   
    console.log(data);
    return data.photographers; /* récupération tableau de données photographers  */
    
}

 
/* Création de toutes les cards individuellement par la fonction photographerFactory qui se
 trouve dans photographer.js et affichage dans la section photographer_section */
async function displayData(photographers) {
     /*  Récupération de la section où seront affichées les cards */
    const photographersSection = document.querySelector(".photographer_section");

        /* photographerArticle = chaine de caractères qui va contenir le code HTML d'une card 
        par la fonction photographerFactory pour chaque appel */
     
    /*initiale la variable pour récupérer les données pour carte photographe  */
    let userCardDOM = "";
    photographers.forEach((photographer) => {
        /* pour récupérer du bloc article de chaque photographe */        
        userCardDOM += photographerFactory(photographer); 
    });   
    
    /* Affichage de toutes les cards dans la section photographersSection */
    photographersSection.innerHTML = userCardDOM;

};

/* Chargement des données et affichage des cards au chargement de la page */
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);

    /*    const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    */


};
    
init();
    