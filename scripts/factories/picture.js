/* import class */
import Media from "./media.js";

export default class Picture extends Media{
    constructor(options, firstName){
        super(options); /* options de la classe Media (donnée medias) pour la nouvelle instance*/
        this.image = options.image; /* média image pour la nouvelle instance  */
        this.title = options.title; /* média titre image pour la nouvelle instance   */
        this.firstName = firstName; /* nom du photographe pour la nouvelle instance  */
        this.create(); /* création bloc article média contenant l' image*/
    }
    create(){
        /* bloc image  */
        let mediaContent = `<img src="assets/images/${this.firstName}/${this.image}" alt="${this.title}" class="contentMedia">`;
        /* methode create de la classe media pour créer le bloc article média
        contenant l'image  */
        super.create(mediaContent); 
    }
}