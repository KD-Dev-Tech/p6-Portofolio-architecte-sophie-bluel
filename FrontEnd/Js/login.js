/******************** Variable general *********************/
const form = document.querySelector('form')
const email = document.querySelector("form #email") 
const password = document.querySelector('form #password')
const erreur = document.querySelector("#login p")

console.log()
console.log()
 
/*******************  */

form.addEventListener("submit", (event) => {
    event.preventDefault()
})


function verifEmail (balise) {
    const emailRegex = new RegExp ("[a-z0-9-._]+@[a-z0-9._-]+\\.[a-z]+$")
    if (emailRegex.test(balise.value)){
        console.log('true')
        return true   
    }else{
        console.log( "false")
        return false
    }
}
email.addEventListener("change", () => {
    verifEmail(email)
    console.log(email.value);
})

function verifPassword (password) {
    const passwordRegex = new RegExp ("[A-Za-z\d]$")
    if (passwordRegex.test(password.value)){
        console.log('true')
        return true   
    }else{
        console.log( "false")
        return false
    }
}
password.addEventListener("change", ()=>{
    verifPassword(password)
    console.log(password.value);
})


