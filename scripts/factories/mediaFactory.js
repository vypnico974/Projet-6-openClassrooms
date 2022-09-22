/* import class */
import Video from "./video.js";
import Picture from "./picture.js";

/*  instanciation class Picture et Video qui ont hérité de la class média  */
export default class MediaFactory{
    constructor(media,  firstName){
        if(media.image){ /* format média image  */
            /* création du bloc article média contenant l'image  */
            return new Picture(media, firstName);
        }else if(media.video){  /* format média vidéo  */
            /* création du bloc article média contenant la vidéo  */
            return new Video(media, firstName);
        }
        else {
            throw "format  média inconnu";
        }
    }
}