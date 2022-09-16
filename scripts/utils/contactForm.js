/* import functions  */
import{validateFirst} from "./userInterface.js";
import{validateLast} from  "./userInterface.js";
import{validateEmail} from "./userInterface.js";
import{validateMessage} from "./userInterface.js";


/*  constantes DOM  */
const body = document.getElementById("body");
const modal = document.getElementById("contact_modal");
const form = document.getElementById("contact_form");
const first = document.getElementById("inputFirstname");
const last = document.getElementById("inputLastname");
const email = document.getElementById("inputEmail");
const message = document.getElementById("inputMessage");
const closeContactForm = document.getElementById("closeContactForm");
const messagesError = {
    lastNameError: '2 lettres de l\'alphabet ou plus pour le nom.',
    firstNameError: '2 lettres de l\'alphabet ou plus pour le prénom.',
    emailError: 'format adresse email non valide.',
    messageError: '10 caractères ou plus pour le message.'
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

 /* ecoute évènement clic pour ouverture de la modale */
document.getElementById("openModal").addEventListener("click", (e) =>{
    displayModal(e);
});
 /* ecoute évènement clic pour fermeture de la modale */
 document.getElementById("closeContactForm").addEventListener("click", (e) =>{
    closeModal(e);
});

/*  modale contact ouverture  */
function displayModal() {  
    
    /* accessibilité modale par la touche echap */
    document.getElementById("contact_modal").focus(); 
    
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
    body.classList.add("no-scroll");
  
  
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
    /* accessibilité modale, body et  main  */
    document.getElementById("main").ariaHidden = "false";
    document.getElementById("contact_modal").ariaHidden = "true";
    body.classList.remove("no-scroll");
    /* accessibilité modale par la touche echap */
    document.getElementById("openModal").focus();
}

function validateForm(){
    /*  donnnées saisie insérées dans l'objet responses du formulaire  */
    responses.data.firstName = first.value;
    responses.data.lastName = last.value;
    responses.data.email = email.value;
    responses.data.message = message.value;
    if(validateFirst(first,messagesError) &&
        validateLast(last,messagesError) &&
        validateEmail(email,messagesError) &&
        validateMessage(message,messagesError) 
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
    validateFirst(first,messagesError);
    validateLast(last,messagesError);
    validateEmail(email,messagesError);
    validateMessage(message,messagesError);
    validateForm();   
});
  
 
