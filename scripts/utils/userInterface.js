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
}

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


/* paramètres : tableau media , prénom ,trie selectionné, lien pour la lightbox */
export function displayMedia(medias,  firstName, sortBy, lightbox){
    /* bloc pour afficher les médias */
    const divMedias = document.getElementById("medias"); 
    let articlesList = ""; /*code HTML pour les articles medias*/
    let sortedMedias = null; /* tableau pour les médias triés */
    let temporary = null; /* stockage temporaire pour l'ordre de trie  */
    let currentParent = null; /* Contiendra l'id de l'élément parent 
    du tri sélectionné pour inverser l'ordre des options */
    
    switch (sortBy) {
        /* Tri décroissant likes du média.
        Inverser les opérateurs de comparaison pour passer en tri croissant */
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

        /* Tri décroissant date du média */
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

    /*   Inversion des boutons premier trie avec
     le bouton cliqué (second bouton ou troisième bouton)  */
    temporary = document.getElementById("firstSort").innerHTML;
    document.getElementById("firstSort").innerHTML = document.getElementById(currentParent).innerHTML;
    document.getElementById(currentParent).innerHTML = temporary;

    /*ecoute évenement clic pour les fonctions de tries */
    document.getElementById("btnSortLikes").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Likes",lightbox);
    });
    document.getElementById("btnSortDate").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Date",lightbox);
    });
    document.getElementById("btnSortTitle").addEventListener("click", () => {
       displayMedia(sortedMedias, firstName, "Title",lightbox);
    });

    
    /* cartes médias  */
    for (const mediaItem of sortedMedias) {
        let mediaCard = new MediaFactory(mediaItem, firstName);   
        articlesList += mediaCard.article;
    }
    
    /* Affichage des cartes dans le bloc médias */
    divMedias.innerHTML = articlesList; 

    /* Gestion de la lightbox sur le lien de chaque média */
    let listMediaLinks = document.querySelectorAll("a.mediaLink");
    lightbox.mediasList = sortedMedias;


    /* écoute évènement clic coeur de chaque carte  pour incrémenter le nombre
     des like de la carte puis de la somme total des likes des cartes */
    let listDivLike = document.querySelectorAll("div.totalLikes");
    for (const like of listDivLike) {
        like.addEventListener("click", addLike);
    } 
    for (const link of listMediaLinks) {
        link.addEventListener("click", (e) => {
            /* récupére l'id du media cliqué stocké dans le dataset
            puis lancer la lighbox  */
            lightbox.launch(e.currentTarget.dataset.id);
        });
    }

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
                            <span>${likesCount}</span>
                            <i class="fa-solid fa-heart"></i>
                        </div> 
                        <span>${price}€ / jour</span>`;    
}


/* gestion de l'affichage menu trie  */
 export function displayMenuFilters(){
    /* classList.toggle : dans ce cas, 1 seul argument est présent, donc
     change la présence d'une classe dans  la liste. Si la classe existe,
      alors la supprime et renvoie false, dans le cas inverse,
       ajoute cette classe et retourne true.  */
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
    let numberLike = this.firstElementChild.innerText;
    /* affichage nombre de like et de l'icône coeur plein  */
    this.firstElementChild.innerHTML=
     `<span class="marginLikes">${numberLike}</span><button aria-label="likes"><i class="fa-heart fas iconHeart" aria-hidden="true"></i></button>`;
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
    let numberLike = this.firstElementChild.innerText;
    /* affichage nombre de like et de l'icône coeur  vide  */
    this.firstElementChild.innerHTML=
     `<span class="marginLikes">${numberLike}</span><button aria-label="likes"><i class="fa-heart far iconHeart" aria-hidden="true"></i></button>`;
     /* suppression de l'évènement du click pour soustraire un like */
    this.removeEventListener("click", removeLike);
    /* ajouter de l'évènement du click pour ajouter un like */
    this.addEventListener("click", addLike);
    /* Incrémenter le total de likes(bas de page) */
    let currentTotal = parseInt(document.getElementById("countLikes").firstElementChild.innerText);
     /*afficher le nombre total de like  */
    document.getElementById("countLikes").firstElementChild.innerText = currentTotal - 1;
}



/* vérification du prénom */
export function validateFirst(first, messagesError) {    
    /* expressions régulières(regex) /^ pour début   $/ pour fin 
    [A-zÀ-ú-] les lettres minuscule et majuscule avec accent,tiret et apostrophe sont possible 
    {2,} minimun 2 autorisés    */
    const regex = /^[A-zÀ-ú-']{2,}$/;
    if (!regex.test(first.value)) {
        /* affichage message d'erreur et encadrer d'erreur */
        document.querySelector(".first-error").innerText =
        messagesError.firstNameError; 
        first.classList.add("data-error");
        first.classList.remove("data-validate"); 
        return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".first-error").innerText  = "";
    first.classList.remove("data-error"); 
    first.classList.add("data-validate");
    return true

}

/* vérification du nom */
export function validateLast(last,messagesError) {
    /* supprime n’importe quel symbole d’espacement, autorise les noms à particule   */
    const space = last.value.replace(/\s+/g, '') 
    /* expressions régulières(regex) /^ pour début   $/ pour fin 
    [A-zÀ-ú-] les lettres minuscule et majuscule avec accent,tiret et apostrophe sont possible 
    {2,} minimun 2 autorisés */             
    const regex = /^[A-zÀ-ú-']{2,}$/;
    if (!regex.test(space)) {
        /* affichage message d'erreur et encadrer d'erreur */
        document.querySelector(".last-error").innerText =
        messagesError.lastNameError; 
        last.classList.add("data-error");
        last.classList.remove("data-validate"); 
        return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".last-error").innerText  = "";
    last.classList.remove("data-error"); 
    last.classList.add("data-validate");
    return true
}

/*  vérification format email   */
export function validateEmail(email,messagesError) {
    /* caractère alphanumerique (sans accent) avant et après le "@" et le point  */
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!regex.test(email.value)) {
       /* affichage message d'erreur et encadrer d'erreur */
       document.querySelector(".email-error").innerHTML =
       messagesError.emailError; 
       email.classList.add("data-error");
       email.classList.remove("data-validate"); 
       return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".email-error").innerText  = "";
    email.classList.remove("data-error"); 
    email.classList.add("data-validate");
    return true
}

/*  vérification format email   */
export function validateMessage(message,messagesError) {
    /* minimum 10 caractères */
    if (message.value.length < 10) {
       /* affichage message d'erreur et encadrer d'erreur */
       document.querySelector(".message-error").innerText =
       messagesError.messageError; 
       message.classList.add("data-error");
       message.classList.remove("data-validate"); 
       return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".message-error").innerText  = "";
    message.classList.remove("data-error"); 
    message.classList.add("data-validate");
    return true
}


