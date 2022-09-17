export default class Media{
    constructor(options){ /* donnée medias*/
        this.title = options.title; /* titre du médias */
        this.likes = options.likes; /* nombre de likes média  */
        this.id = options.id; /* id du média  */
           }
    /* pour créer le bloc article média contenant soit l'image ou la vidéo par mediaContent */
    create(mediaContent){
        this.article = `<article class="articleMedia">
                            <a href="#" title="${this.title}, closeup view " data-id="${this.id}" id="${this.id}" class="mediaLink" role="button" aria-haspopup="dialog" aria-controls="lightbox">
                             ${mediaContent}
                            </a>                            
                            <h2 class="titleMedia">${this.title}</h2>
                            <div class="totalLikes" role="button">
                                <button aria-label="likes">
                                    <span>${this.likes}</span>
                                    <i class="fa-heart far iconHeart"></i> 
                                </button>   
                            </div>
                        </article>`
    }
}

