/*  constantes DOM  */
const modal = document.getElementById("contact_modal");
const form = document.getElementById("contact_form");

/*  modale contact ouverture  */
function displayModal() {   
   	modal.style.display = "block";  /* ouverture de la modale  */
    /* récupérer le nom dans le titre h1 de la page */
    let firstName = document.querySelector("h1.firstName").innerText;
    /* ajout nom photographe dans le titre de la modale */
    document.getElementById("contactMe").innerHTML = "Contactez-moi " + firstName;
    
    /* accessibilité modale et main  */
    document.getElementById("main").ariaHidden = "true";
    document.getElementById("contact_modal").ariaHidden = "false";
    /* accessibilité fermeture de la modale par la touche echap */
    document.getElementById("contact_modal").focus(); 
  
}

function closeModal() {
    modal.style.display = "none";
}
