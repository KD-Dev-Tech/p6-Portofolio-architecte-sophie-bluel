/******************************* Variable general ***************************************/

const form = document.querySelector('form')                // Recuperation formulaire 
const email = document.querySelector("form #email")        // Recuperation balise email 
const password = document.querySelector('form #password')  // Recuperation balise password 
const errorMessage = document.querySelector("#login p")    // Recuperation balise p message d'erreur

/************************ Validation Formulaire  **************************************/

function validateUsers() {
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ // regex pour l'email
    const passwordRegex = /^[A-Za-z0-9]{5,}$/                   // regex pour le mot de passe

    if (!emailRegex.test(email.value)) {
        console.log("false")
        errorMessage.innerHTML = "veuillez vous identifier" 
        return false
    }
    if (!passwordRegex.test(password.value)) {
        console.log("false")
        errorMessage.innerHTML = "Le mot de passe doit contenir au moins 5 caractères alphanumériques"
        return false
    }
    console.log("true")
    return true
}
 
/******************************* Fonction de connexion *****************************************/

async function login() {
    if (!validateUsers()) {
        return false
    }
    const loginData = {
        email: email.value,
        password: password.value     
    }
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        })
        if (!response.ok) {
            throw new Error('Erreur dans l’identifiant ou le mot de passe.')
        }
        const data = await response.json()
        localStorage.setItem('token', data.token)
        window.location.href = 'index.html'
    } catch (error) {
        errorMessage.innerHTML = error.message
    }
}

/****************************** Écouteurs d'événements *****************************************/

// Écouteur d'événement sur le formulaire pour éviter le rechargement de la page au moment du submit
form.addEventListener("submit", (event) => {
    event.preventDefault()
    login()
})

// Écouteur d'événement sur la balise email
email.addEventListener("change", () => {
    if (email.value === "") {
        errorMessage.innerHTML = "Email invalide"     
    }else{
        errorMessage.innerHTML=""
    }
     console.log(email.value)
})

// Écouteur d'événement sur la balise Mot de passe
password.addEventListener("change", () => {
    if (password.value === "" ) {
        errorMessage.innerHTML = "Veuillez entrer un Mot de passe " 
    }else{
        errorMessage.innerHTML=""
    }
    console.log(password.value)
})