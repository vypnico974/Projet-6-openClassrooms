/*  constantes DOM  */
const body = document.getElementById("body");
const openModal = document.getElementById("openModal");
const modal = document.getElementById("contact_modal");
const form = document.getElementById("contact_form");
const first = document.getElementById("inputFirstname");
const last = document.getElementById("inputLastname");
const email = document.getElementById("inputEmail");
const message = document.getElementById("inputMessage");
const closeContactForm = document.getElementById("closeContactForm");
const messagesError = {
    lastNameError: 'Veuillez entrer 2 caractères ou plus le nom.',
    firstNameError: 'Veuillez entrer 2 caractères ou plus pour le prénom.',
    emailError: 'Veuillez entrer une adresse email valide.',
    messageError: 'Veuillez entrer 10 caractères ou plus pour le message.'
};
/* objet pour insérer toutes les données saisies dans le formulaire  */
let responses = {
    isValid: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    }   
  }
/*  modale contact ouverture  */
function displayModal() {   
   	

    /* récupérer le nom dans le titre h1 de la page */
    let firstName = document.querySelector("h1.firstName").innerText;
    /* les champs de saisies du formulaire sont focus */
    const focusElement = document.querySelectorAll("#contact_modal input, #contact_modal textarea, #contact_modal  img, #contact_modal button");
    const firstElement = focusElement[0]; 
    const lastElement = focusElement[(focusElement.length - 1)];

    closeContactForm.focus();
    modal.style.display = "block";  /* ouverture de la modale  */
    
    /* ajout nom photographe dans le titre de la modale */
    document.getElementById("contactMe").innerHTML = "Contactez-moi " + firstName;
    
    /* accessibilité modale, body et main  */
    document.getElementById("main").ariaHidden = "true";
    document.getElementById("contact_modal").ariaHidden = "false";


    /*********** problème scroll à cherche solution ****************************/
    // body.classList.add("no-scroll");
    /************************************************************************** */


    /* accessibilité modale par la touche echap */
    document.getElementById("contact_modal").focus(); 
    /* accessibilité gestion de la navigation au clavier avec tab  */
    document.querySelector("#contact_modal").addEventListener("keydown", (e) =>{
        const current = e.target;
        if (e.key === "Escape" || (e.key === "Enter" && current == firstElement)){
            e.preventDefault();
            closeModal();            
        }else if(current == lastElement){
           /* shiftkey touche MAJ */
            if(!e.shiftKey && e.key === "Tab"){ 
                e.preventDefault();
                document.getElementById(firstElement.id).focus();
            }
        }else if(current == firstElement){
            if(e.shiftKey && e.key === 'Tab'){
                e.preventDefault();
                document.getElementById(lastElement.id).focus();
            }
        }
    });  
}


/* fermeture de la modale  */
function closeModal() {
    modal.style.display = "none";
    /* réinitialisation du formulaire */
    document.forms["contact_form"].reset();
    /* accessibilité modale, body et  main  */
    document.getElementById("main").ariaHidden = "false";
    document.getElementById("contact_modal").ariaHidden = "true";

    /***************  problème scroll à cherche solution  ***********/
    //body.classList.remove("no-scroll");
    /***************************************************************/

    /* accessibilité modale par la touche echap */
    document.getElementById("openModal").focus();
   // location.reload();

}


/* vérification du prénom */
function validateFirst() {    
    /* expressions régulières(regex) /^ pour début   $/ pour fin 
    [A-zÀ-ú-] les lettres minuscule et majuscule avec accent,tiret et apostrophe sont possible 
    {2,} minimun 2 autorisés    */
    const regex = /^[A-zÀ-ú-']{2,}$/;
    if (!regex.test(first.value)) {
        /* affichage message d'erreur et encadrer d'erreur */
        document.querySelector(".first-error").innerText =
        messagesError.firstNameError; 
        first.classList.add("data-error");
        first.classList.remove("data-validate"); 
        return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".first-error").innerText  = "";
    first.classList.remove("data-error"); 
    first.classList.add("data-validate");
    return true
}

/* vérification du nom */
function validateLast() {
    /* supprime n’importe quel symbole d’espacement, autorise les noms à particule   */
    const space = last.value.replace(/\s+/g, '') 
    /* expressions régulières(regex) /^ pour début   $/ pour fin 
    [A-zÀ-ú-] les lettres minuscule et majuscule avec accent,tiret et apostrophe sont possible 
    {2,} minimun 2 autorisés */             
    const regex = /^[A-zÀ-ú-']{2,}$/;
    if (!regex.test(space)) {
        /* affichage message d'erreur et encadrer d'erreur */
        document.querySelector(".last-error").innerText =
        messagesError.lastNameError; 
        last.classList.add("data-error");
        last.classList.remove("data-validate"); 
        return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".last-error").innerText  = "";
    last.classList.remove("data-error"); 
    last.classList.add("data-validate");
    return true
}

/*  vérification format email   */
function validateEmail() {
    /* caractère alphanumerique (sans accent) avant et après le "@" et le point  */
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!regex.test(email.value)) {
       /* affichage message d'erreur et encadrer d'erreur */
       document.querySelector(".email-error").innerText =
       messagesError.emailError; 
       email.classList.add("data-error");
       email.classList.remove("data-validate"); 
       return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".email-error").innerText  = "";
    email.classList.remove("data-error"); 
    email.classList.add("data-validate");
    return true
}

/*  vérification format email   */
function validateMessage() {
    /* minimum 10 caractères */
    if (message.value.length < 10) {
       /* affichage message d'erreur et encadrer d'erreur */
       document.querySelector(".message-error").innerText =
       messagesError.messageError; 
       message.classList.add("data-error");
       message.classList.remove("data-validate"); 
       return false
    }
    /* pas de message d'erreur et encadrer de validation */
    document.querySelector(".message-error").innerText  = "";
    message.classList.remove("data-error"); 
    message.classList.add("data-validate");
    return true
}

function validateForm(){
    /*  donnnées saisie insérées dans l'objet responses du formulaire  */
    responses.data.firstName = first.value;
    responses.data.lastName = last.value;
    responses.data.email = email.value;
    responses.data.message = message.value;
    console.log("les champs saisies:",responses); 
    if(validateFirst() &&
        validateLast() &&
        validateEmail() &&
        validateMessage() 
        === true){
        responses.isValid = true;
        console.log("les champs saisies:",responses);       
        closeModal();
        /*  pour réinitialiser les variables après confirmation de la réservation */
       location.reload(); 
    }
}

/* évènement du submit formulaire et vérification des saisies du formulaire */
form.addEventListener('submit', (e) => { 
    e.preventDefault();  /* ne pas recharger la modale avec le click submit */
    validateFirst();
    validateLast();
    validateEmail();
    validateMessage();
    validateForm();   
});
  
 
