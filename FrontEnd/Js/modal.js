const containerModals = document.querySelector(".containerModals")
const xmark = document.querySelector (".fa-xmark")
const modalsGallery = document.querySelector (".modalsGallery")
const buttonPhoto = document.querySelector (".buttonPhoto")
const buttonModif = document.querySelector(".button-modifier") 

/************** Ouverture /  Fermeture Modals ************************/

buttonModif.addEventListener("click", () => {
    containerModals.style.display = "flex" 
})

xmark.addEventListener("click", () => {
    containerModals.style.display = "none"    
})

containerModals.addEventListener("click", (e) => {
    if(e.target === containerModals ){
        containerModals.style.display = "none"
    }
console.log(e.target.className);
})

