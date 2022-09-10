/* import class */
import Video from "./video.js";
import Picture from "./picture.js";

/*  adaptateur pour afficher les formats images et videos   */
export default class MediaFactory{
    constructor(media, firstName){
        if(media.image){
            return new Picture(media, firstName);
        }else if(media.video){
            return new Video(media, firstName);
        }
        else {
            throw "format inconnu"
        }
    }
}