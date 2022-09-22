export default class Media{
    constructor(options){ /* donnée medias*/
        this._title = options.title; /* titre du médias */
        this._likes = options.likes; /* nombre de likes média  */
        this._id = options.id; /* id du média  */
           }
    /* pour créer le bloc article média contenant soit l'image ou la vidéo par mediaContent */
    create(mediaContent){
        this.article = `<article class="articleMedia">
                            <a href="#" title="${this._title}, vue agrandie" data-id="${this._id}" id="${this._id}" class="mediaLink" role="button" aria-haspopup="dialog" aria-controls="lightbox">
                             ${mediaContent}
                            </a>                            
                            <h2 class="titleMedia">${this._title}</h2>
                            <div class="totalLikes">
                                <div class="contentLikes">
                                    <span class="marginLikes">${this._likes}</span>
                                    <button aria-label="likes">
                                    <i class="fa-heart far iconHeart" aria-hidden="true"></i>
                                    </button>
                                </div>   
                            </div>
                        </article>`
    }
}

