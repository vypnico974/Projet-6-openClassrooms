/* import class */
import Media from "./Media.js";

export default class Video extends Media{
    constructor(options, firstName){
        super(options);
        this.video = options.video;
        this.firstName = firstName;
        this.create();
    }
    create(){
        /* création du bloc video   */
        let mediaContent = `<video class="contentMedia"><source src="assets/images/${this.firstName}/${this.video}" type="video/mp4"></video>`;
        super.create(mediaContent);

       // console.log(mediaContent);
    }
}