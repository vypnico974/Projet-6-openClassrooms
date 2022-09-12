export function photographerFactory(data) {
    /* récupérer les valeurs des clés */
    const { name, portrait, city, country, tagline, price, id } = data;
  //  console.log("./assets/images/Photographers_ID_photos/"+portrait);
    /* Création carte avec les valeurs récupérées */
    const article = `
        <article>
            <a href= "./photographer.html?id=${id}" title="${name}">
                <img src="./assets/images/Photographers_ID_photos/${portrait}" class="portrait" alt="">
                <h2>${name}</h2>
            </a>
            <p class="localite">${city}, ${country}</p>
            <p class="bold">${tagline}</p>
            <p class="boldLight">${price}€/jour</p>
        </article>
    `;
   return article;
}