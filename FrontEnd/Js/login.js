/******************************* Variable general ***************************************/

const form = document.querySelector("form")                                                                 // Recuperation formulaire 
const email = document.querySelector("form #email")                                                         // Recuperation balise email 
const password = document.querySelector("form #password")                                                   // Recuperation balise password 
const errorMessage = document.querySelector("#login p")                                                     // Recuperation balise p pour le message d'erreur

/************************ Validation Formulaire  **************************************/

function validateUsers() {                                                                                  // Fonction qui verifie si l'email et le password sont valide 
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/                                             // Declare une variable qui stock une experession reguliaire pour valider l'Email
    const passwordRegex = /^[A-Za-z0-9]{5,}$/                                                               // Declare une variable qui stock une experession reguliaire pour valider le Password

    if (!emailRegex.test(email.value)) {                                                                    // Vérifie si l'email ne correspond pas à son expression régulière
        console.log("false")                                                                                
        errorMessage.innerHTML = "veuillez vous identifier"                                                 // Affiche un message d'erreur pour l'email invalide
        return false                                                                                        // Retourne false pour indiquer que la validation a echoué 
    }
    if (!passwordRegex.test(password.value)) {                                                              // Vérifie si le password ne corespond pas à son expression reuliaire 
        console.log("false")    
        errorMessage.innerHTML = "Le mot de passe doit contenir au moins 5 caractères alphanumériques"      // Affiche le message d'erreur pour le password invalide 
        return false                                                                                        // Retourne false pour indiquer que la validation a echoué 
    }
    console.log("true")
    return true                                                                                             // Retourne true pour indiquer que la validation a reussi 
}
 
/******************************* Fonction de connexion *****************************************/

async function login() {                                                                                    // Fonction qui envoie le Formulaire pour autorisé la connexion 
    if (!validateUsers()) {                                                                                 // Verifie si la fonction validateUsers retourne false , sinon ne continue pas   
        return false                                                                                        // Arrete l'execution de la fonction login si validateUsers rtourne false 
    }
    const loginData = {                                                                                     // Objet contenant les données de connexion
        email: email.value,                                                                                 // Recuperation de la valeur de l'email
        password: password.value                                                                            // Récuperation de la valeur du password
    }
    try {                                                                                                   // Bloc pour gerer les erreurs potentielles
        const response = await fetch('http://localhost:5678/api/users/login', {                             // Envoi une requete a l 'API de connexion
            method: "POST",                                                                                 // Methode de l'envoie de la requete
            headers: { "Content-Type": "application/json" },                                                // En-tete de la requete specifiant le type de contenu
            body: JSON.stringify(loginData)                                                                 // Corp de la requete convertit en JSON
        })
        if (!response.ok) {                                                                                 // Si la reponse n'est pas ok 
            throw new Error("Erreur dans l’identifiant ou le mot de passe.")                                // Leve une erreur avec un message specifique 
        }
        const data = await response.json()                                                                  // Covertit la reponse en JSON
        localStorage.setItem('token', data.token)                                                           // On stock le token recu dans le localStorage
        window.location.href = 'index.html'                                                                 // On redirige l'utilisateur sur la page d'acceuil
    } catch (error) {                                                                                       // Gere les erreurs survenues lors de la requete 
        errorMessage.innerHTML = error.message                                                              // Affiche le message d'erreur dans l'element prevue a cette effet
    }
}

/****************************** Écouteurs d'événements *****************************************/

// Écouteur d'événement sur le formulaire pour éviter le rechargement de la page au moment du submit

form.addEventListener("submit", (event) => {                                                                // Ajout d'un ecouteur d'evenement sur formulaire lors du submit 
    event.preventDefault()                                                                                  // Empeche le rechargement de la page lors de la soumission du formulaire
    login()                                                                                                 // Appel de la fonction login pour gerer la connexion 
})

// Écouteur d'événement sur la balise email

email.addEventListener("change", () => {                                                                    // Ajout d'un ecouteur d'evenement sur le champ de l'email lors du changement de valeur 
    if (email.value === "") {                                                                               // Verifie si le champ de l'email est vide
        errorMessage.innerHTML = "Email invalide"                                                           // Affiche le message d'eereur prevue a cette effet
    }else{                                                                                                  // Sinon si le champ n'est pas vide 
        errorMessage.innerHTML=""                                                                           // Vide le message d'erreur
    }
     console.log(email.value)
})

// Écouteur d'événement sur la balise Mot de passe

password.addEventListener("change", () => {                                                                 // Ajout d'un ecouteur d'evenement sur le champ du password lors du changement de valeur 
    if (password.value === "" ) {                                                                           // Verifie si le champ du pswword est vide
        errorMessage.innerHTML = "Veuillez entrer un Mot de passe "                                         // Affiche le message d'eereur prevue a cette effet
    }else{                                                                                                  // Sinon si le champ n'est pas vide
        errorMessage.innerHTML=""                                                                           // Vide le message d'erreur
    }
    console.log(password.value)
})