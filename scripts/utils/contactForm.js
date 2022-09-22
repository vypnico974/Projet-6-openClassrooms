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
/* objet pour insérer toutes les données saisies du formulaire  */
let responses = {
    isValid: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    }   
  }
 /* ecoute évènement clic bouton "contactez-moi" pour ouverture de la modale */
document.getElementById("openModal").addEventListener("click", (e) =>{
    displayModal(e);
});
 /* ecoute évènement clic pour fermeture de la modale par l'icone croix */
 closeContactForm.addEventListener("click", (e) =>{
    closeModal(e);
});

/*  modale contact ouverture  */
function displayModal() {      
    /* récupérer le nom dans le titre h1 de la page */
    let firstName = document.querySelector("h1.firstName").innerText;
    /* les champs de saisies du formulaire sont focus */
    const focusElement = document.querySelectorAll("#contact_modal input, #contact_modal textarea, #contact_modal  img, #contact_modal button");
    const firstElement = focusElement[0]; 
    const lastElement = focusElement[(focusElement.length - 1)];
    document.getElementById("contact_modal").focus(); 
    modal.style.display = "block";  /* ouverture de la modale  */    
    /* ajout nom photographe dans le titre de la modale */
    document.getElementById("contactMe").innerHTML = "Contactez-moi " + firstName;    
    /* l’ensemble du contenu du document, en dehors de la modale est mise en retrait  */
    document.getElementById("body").ariaHidden = "true";
    document.getElementById("contact_modal").ariaHidden = "false";
    body.classList.add("no-scroll");  
    /*  mettre le focus pour icône fermeture modal */
    closeContactForm.focus();     
    /* accessibilité gestion de la navigation au clavier avec tab  */
    document.querySelector("#contact_modal").addEventListener("keydown", (e) =>{
        const current = e.target;
        /* touche echap ou touche entrée sur l'icône croix fermeture  */
        if (e.key === "Escape" || (e.key === "Enter" && current == firstElement)){
          e.preventDefault();
            closeModal();            
        }else if(current == lastElement){
           /* pas la touche touche MAJ et touche Tab , sens défilement focus*/
            if(!e.shiftKey && e.key === "Tab"){ 
               e.preventDefault();
                document.getElementById(firstElement.id).focus();
            }
        }else if(current == firstElement){
             /* touche MAJ et touche Tab , sens inverse défilement focus*/
            if(e.shiftKey && e.key === 'Tab'){
                e.preventDefault();  
                document.getElementById(lastElement.id).focus();
            }
        }
         /* ecoute évènement touche espace pour fermeture de la modale */
        if((e.target == closeContactForm) && (e.key === ' ')){
            closeModal(e);
        } 
    });  
}

/* fermeture de la modale  */
function closeModal() {
    modal.style.display = "none"; 
    /* enleve le retrait pour l'ensemble du document puis retrait du formulaire  */  
    document.getElementById("body").ariaHidden = "false";
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
        responses.isValid = true; /* tout les contrôles sont vrai   */
        console.log("les champs saisies:",responses);       
        closeModal();
        /*  pour réinitialiser les variables après fermeture de la modale */
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
  
 
