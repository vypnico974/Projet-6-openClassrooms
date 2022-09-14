export default class Media{
    constructor(options){ /*options correspond donnée medias pour la nouvelle instance*/
        this.title = options.title; /* titre du médias pour la nouvelle instance */
        this.likes = options.likes; /* nombre de likes média pour la nouvelle instance   */
        this.id = options.id; /* id du média pour la nouvelle instance   */
           }
    /* pour créer le bloc article média contenant soit l'image ou la vidéo par mediaContent */
    create(mediaContent){
        this.article = `<article class="articleMedia">
                            <a href="#" title="${this.title}, vue agrandie" data-id="${this.id}" id="${this.id}" class="mediaLink" role="button" aria-haspopup="dialog" aria-controls="lightbox">
                             ${mediaContent}
                            </a>                            
                            <h2 class="titleMedia">${this.title}</h2>
                            <div class="totalLikes" role="button">
                                <span>${this.likes}</span>
                                <button aria-label="Ajout ou suppression coeur">
                                    <i class="fa-heart far"></i> 
                                </button>   
                            </div>
                        </article>`
    }
}

