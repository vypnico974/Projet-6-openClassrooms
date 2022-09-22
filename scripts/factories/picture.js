/* import class */
import Media from "./media.js";

export default class Picture extends Media{
    constructor(options, firstName){
        super(options); /* options donnée medias */
        this._image = options.image; /* média image   */
        this._title = options.title; /* média titre  */
        this._firstName = firstName; /* nom du photographe   */
        this.create(); /* création bloc article média contenant l' image*/
    }
    create(){
        /* bloc image  */
        let mediaContent = `<img src="assets/images/${this._firstName}/${this._image}" alt="${this._title}" class="contentMedia">`;
        /* methode create de la classe media pour créer le bloc article média
        contenant l'image  */
        super.create(mediaContent); 
    }
}