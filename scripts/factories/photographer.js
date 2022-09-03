function photographerFactory(data) {
    // récupérer les valeurs des clés
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(name);
    
  /*  const { name, portrait } = data; */

    // Création card avec les valeurs récupérées
    const article = `
        <article>
            <a href= "./photographer.html?id=${id}" title="${name}">
                <img src="./assets/images/Photographers_ID_photos/${portrait}" class="" alt="">
                <h2>${name}</h2>
            </a>
            <p>${city}, ${country}</p>
            <p class="bold">${tagline}</p>
            <p class="boldLight">${price}€/jour</p>
        </article>
    `;

  /*
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article); 
    }*/
   /* return { name, picture, getUserCardDOM } */
   return article;
}