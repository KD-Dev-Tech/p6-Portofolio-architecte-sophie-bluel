const token = localStorage.getItem("token")
const buttonModif = document.querySelector (".button-modifier") 
const xmark = document.querySelectorAll (".containerModals .fa-xmark")
const arrow = document.querySelector (".fa-arrow-left")
const containerModals = document.querySelector (".containerModals")
const modalsGallery = document.querySelector (".modalsGallery")
const galleriePhoto = document.querySelector (".galleryModals")
const buttonPhoto = document.querySelector (".buttonPhoto")
const modalsAjout = document.querySelector(".modalsAjout")
const form = document.querySelector(".modalsAjout form")
const title = document.getElementById('titre')
const errorForm = document.querySelector(".formulairePhoto span")
const icone = document.querySelector(".ajoutPhoto i")
const label = document.querySelector(".ajoutPhoto label")
const buttonAjout = document.querySelector(".modalsAjout input[type='file']")
const previewImg = document.querySelector(".modalsAjout img")
const category = document.getElementById('category')
const span = document.querySelector(".ajoutPhoto span")

/******************* Affichage photos dans la modal *************************/

async function displayGalleryModals () {
    galleriePhoto.innerHTML = ""
    const gallerie = await getWorks ()
    gallerie.forEach( (work) => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const span = document.createElement("span")
    const trash = document.createElement("i")
    galleriePhoto.appendChild(figure)
    figure.appendChild(span)
    figure.appendChild(img)
    span.appendChild(trash)
    trash.classList.add("fa-solid", "fa-trash-can")
    figure.classList.add("displayImg")
    span.classList.add("trash")
    trash.id = work.id
    img.src = work.imageUrl
    //  console.log(img.src)
    })
    deleted()
    
}
displayGalleryModals()

/************************* Delete photo modale **********************************/

async function deleted (){
    const trashAll = document.querySelectorAll(".fa-trash-can")
    trashAll.forEach(trash =>{
        trash.addEventListener("click", ()=> {         
            const id = trash.id
            const init ={
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}`}
            }
             fetch("http://localhost:5678/api/works/"+id,init)  
            .then (res => {
                console.log(res.status,"L'image a bien etait supprimé")
                /* Suppression d'image dans la galerie */
                displayGalleryModals()
                displayWorks()   
            })
            .catch (error => {
                console.error(error)
            })             
        })            
    })
}

/****************** Affichage categorie Input Select ****************/

async function categoryModal (){
    const select = document.querySelector("form select")
    const categorie = await getFilters()
    categorie.forEach(categorie => {
        const option = document.createElement("option")
        option.value = categorie.id
        select.appendChild(option)
        option.textContent = categorie.name
    })
} 
categoryModal()

/******* Message erreur si les champ titre n'est pas remplie *****************************************/

function validateForm() {
    let isValid = true;
    errorForm.innerHTML = "" 
    if (title.value.trim() === "") {
        errorForm.innerHTML += "Veuillez insérer un titre. "
        isValid = false
    }
    if (!buttonAjout.files.length) {
        errorForm.innerHTML += "Veuillez ajouter une image."
        isValid = false
    }
    return isValid
}
form.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault()
    }
title.addEventListener('input', validateForm)
buttonAjout.addEventListener('change', validateForm)
})


/************************** Preview photo modale  *****************/
function preview (){
buttonAjout.addEventListener(("change"),()=>{
    const file = buttonAjout.files[0];
    console.log(file);
    if(file){
        const reader = new FileReader()
        reader.onload = function (e){
            previewImg.src = e.target.result
            console.log(previewImg);
            previewImg.style.display = "flex"
            span.style.display ="none"
            buttonAjout.style.display ="none"
            label.style.display ="none"
            icone.style.display ="none"
        }
        reader.readAsDataURL(file)
    }
})
}
preview()
/********************** Envoi du formulaire  ********************************/

form.addEventListener("submit", async function (e)  {
    e.preventDefault()
    try{
        const formData = new FormData();
        formData.append('image', buttonAjout.files[0]);
        formData.append('title', title.value);
        formData.append('category', category.value);
        
        const response = await fetch('http://localhost:5678/api/works/', {
        method:'POST',
        headers:{
            Authorization: `Bearer ${token}`
        },
        body:formData
    })
    if (response.ok) {
        console.log("ok")
        displayGalleryModals()
        displayWorks()
    } else {
        console.log("pas ok")
    }
} catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
} 
})  
 
/************** Ouverture /  Fermeture Modals ************************/

buttonModif.addEventListener("click", () => {
    containerModals.style.display = "flex" 
})

xmark.forEach(xmark => {
    xmark.addEventListener("click", () => {
        containerModals.style.display = "none";
    })
})

buttonPhoto.addEventListener(("click"), () =>{
    modalsGallery.style.display = "none"
    modalsAjout.style.display = "flex"
})

arrow.addEventListener(("click"), () =>{
    modalsGallery.style.display = "flex"
    modalsAjout.style.display = "none"
})

containerModals.addEventListener("click", (e) => {
    if(e.target === containerModals ){
        containerModals.style.display = "none"
    }
// console.log(e.target.className);
})
