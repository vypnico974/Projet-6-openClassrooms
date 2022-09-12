export default class Lightbox{
    constructor(mediasList, firstname){
        this.selectMedia = null; /* médias selectionné  */
        this.mediasList = mediasList; /* liste des médias du photographe   */
        this.firstname = firstname; /* nom du photographe  */
        this.events(); /* évènements icônes (flèches et croix) de la lighbox  */
    }
    /* lancer lightbox */
    launch(id){
        /* donnée du média sélectionné par Id */
        this.selectMedia = this.getId(id);   
        this.displayMedia(); /* afficher le média */
        document.getElementById("lightbox").focus(); 
    }
     /* Récupérer données du média sélectionné */
     getId(id){
        return this.mediasList.find(media => media.id == id);
    }


    /*  évènements des boutons lightbox */
    events(){
        /* média précédent cliqué pour l'afficher*/
        document.querySelector("#lightbox .previousMedia").addEventListener("click", () => {
            this.previous();
        });
        /* média suivant cliqué pour l'afficher */
        document.querySelector("#lightbox .nextMedia").addEventListener("click", () => {
            this.next();
        });
        /* icône croix cliqué pour fermer lighbox */
        document.querySelector("#lightbox .closeLightbox").addEventListener("click", () => {
            this.close();
        });
        /* arrière plan cliqué pour fermer lighbox  */
        document.querySelector("#lightbox").addEventListener("click", (e) => {
            if (e.target == e.currentTarget) {
                this.close(); 
            }            
        });
        /* navigation au clavier */
        /*  sélectionner les zones de la lighbox à mettre le focus */
        const focusElements = document.querySelectorAll("#lightbox .nextMedia, #lightbox .previousMedia, #lightbox .closeLightbox");
        const firstElement = focusElements[0];
        const lastElement = focusElements[(focusElements.length - 1)];
        /* écoute l'évènement appuie une touche du clavier sur zones focus ligntbox  */
        document.querySelector("#lightbox").addEventListener("keydown", (e) =>{    
            /* des boutons de la lightbox à atteindre via Tab/Shift + Tab*/
            if(e.target == lastElement){
                if(!e.shiftKey && e.key === "Tab"){
                    e.preventDefault();
                    document.getElementById(firstElement.id).focus();
                }
            }else if(e.target == firstElement){
                if(e.shiftKey && e.key === 'Tab'){
                    e.preventDefault();
                    document.getElementById(lastElement.id).focus();
                }
            }
            /* action à faire si appui touche clavier flèches haut et bas et touche echap  */           
            switch (e.key){
                case "ArrowLeft":
                    e.preventDefault();
                    this.previous();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    this.next();
                    break;
                case "Escape":
                    e.preventDefault();
                    this.close();
                    break;
            }    
        });
    }
    
    /* media suivant */
    next(){
        let index = this.mediasList.findIndex(media => media.id == this.selectMedia.id);
        if (index == this.mediasList.length - 1) {
            /* media actuel  */
            this.selectMedia = this.mediasList[0]; 
        } else {
            /* media suivant séléctionné  */
            this.selectMedia = this.mediasList[index + 1]; 
        }
        this.displayMedia();
    }
    /* media précédent */
    previous(){
        let index = this.mediasList.findIndex(media => media.id == this.selectMedia.id);
        if (index == 0) {
            /* media actuel  */
            this.selectMedia = this.mediasList[this.mediasList.length - 1];
        } else {
            /* media précédent séléctionné  */
            this.selectMedia = this.mediasList[index - 1];
        }
        this.displayMedia();
    }
    /* fermeture modale  */
    close(){
        /* accessiblité modale et  main à la fermeture modale */
        document.getElementById("main").ariaHidden = "false";
        document.getElementById("lightbox").ariaHidden = "true";
        /* enlève la classe pour afficher la lighbox */
        document.querySelector("#lightbox").classList.remove("displayMedia");
       /* Focus remis sur le média que l'on vient de quitter depuis le lightbox */
        document.getElementById(this.selectMedia.id).focus();
    }
    /*  afficher media dans la lighbox  */
    displayMedia(){
        let media = ""; /* initialié le média à sélectionné  */
        /* média sélectionné soit format image ou vidéo  */
        if(this.selectMedia.image){
            media = `<img src="assets/images/${this.firstname}/${this.selectMedia.image}" alt="${this.selectMedia.title}" class="lightboxMedia">
                    <p class="mediaTitle">${this.selectMedia.title}</p>`;
        }else if(this.selectMedia.video){
            media = `<video controls class="lightboxMedia"><source src="assets/images/${this.firstname}/${this.selectMedia.video}" type="video/mp4"></video>
                    <p class="mediaTitle">${this.selectMedia.title}</p>`;
        }
        else{
            throw "format média inconnu";
        }
        /* afficher la lighbox dans le conteneur ("divMediaLightbox" */
        document.getElementById("divMediaLightbox").innerHTML = media;
        /* accessiblité modale main à l'ouverture de la lightbox */
        document.getElementById("main").ariaHidden = "true";
        document.getElementById("lightbox").ariaHidden = "false";
        document.querySelector("#lightbox").classList.add("displayMedia");
    }
}