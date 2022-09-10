export default class Media{
    constructor(options){
        this.title = options.title;
        this.likes = options.likes;
        this.id = options.id;
    }
    /*  bloc article média, icône fontawesome coeur */
    create(mediaContent){
        this.article = `<article class="articleMedia">
                            <a href="#" title="${this.title}, vue agrandie" data-id="${this.id}" id="${this.id}" class="mediaLink" role="button" aria-haspopup="dialog" aria-controls="lightbox">
                             ${mediaContent}
                            </a>                            
                            <p class="titleMedia">${this.title}</p>
                                <div class="likes" aria-label="likes">
                                <p>${this.likes}</p>
                                <i class="fa-solid fa-heart fa-lg"></i>
                            </div>
                        </article>`
    }
}

