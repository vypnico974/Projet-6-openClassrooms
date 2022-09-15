/* import class */
import Media from "./media.js";

export default class Video extends Media{
    constructor(options, firstName){
        super(options); /* options de la classe Media (donnée medias) pour la nouvelle instance*/
        this.video = options.video; /* média vidéo pour la nouvelle instance  */
        this.firstName = firstName; /* nom du photographe pour la nouvelle instance  */
        this.create(); /* création bloc article média contenant la vidéo*/
    }
    create(){
    /* bloc video   */
    let mediaContent = 
        `<video class="contentMedia">
            <source src="assets/images/${this.firstName}/${this.video}" type="video/mp4">
        </video>`;
        /* methode create de la classe media pour créer le bloc article média
        contenant la vidéo  */
        super.create(mediaContent);
    }
}