/* Lecture de photographers.json pour extraction des données 
2 tabeaux dans data : media et photographers */
export async function getPhotographers() {
    try{
        const response = await fetch("./data/photographers.json");
        /* attendre la résolution de la promesse  */
        const data = await response.json(); 
        return data.photographers; /* récupération tableau de données photographers  */ 
    }
    catch(err) {
        /* attrape les erreurs à la fois dans fetch et photographers.json */
        console.log("Une erreur se produit :", err);   
    }       
}

export async function getMedia() {
    try{
        const response = await fetch("./data/photographers.json");
        /* attendre la résolution de la promesse  */
        const data = await response.json(); 
        return data.media; /* récupération tableau de données photographers  */ 
    }
    catch(err) {
        /* attrape les erreurs à la fois dans fetch et photographers.json */
       console.log("Une erreur se produit :", err);
    }       
}