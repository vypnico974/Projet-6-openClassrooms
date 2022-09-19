/* import class */
import Media from "./media.js";

export default class Video extends Media{
    constructor(options, firstName){
        super(options); /* donnée medias */
        this._video = options.video; /* média intitulé vidéo   */
        this._firstName = firstName; /* nom du photographe   */
        this.create(); /* création bloc article média contenant la vidéo*/
    }
    create(){
    /* bloc video   */
    let mediaContent = 
        `<video class="contentMedia">
            <source src="assets/images/${this._firstName}/${this._video}" type="video/mp4">
        </video>`;
        /* methode create de la classe media pour créer le bloc article média
        contenant la vidéo  */
        super.create(mediaContent);
    }
}