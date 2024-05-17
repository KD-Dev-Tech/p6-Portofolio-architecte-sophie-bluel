const containerModals = document.querySelector (".containerModals")
const modalsGallery = document.querySelector (".modalsGallery")
const modalsAjout = document.querySelector(".modalsAjout")
const buttonPhoto = document.querySelector (".buttonPhoto")
const buttonModif = document.querySelector (".button-modifier") 
const galleriePhoto = document.querySelector (".galleryModals")
const xmark = document.querySelectorAll (".containerModals .fa-xmark")
const arrow = document.querySelector (".fa-arrow-left")




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

/******************* Affichage photos *************************/

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
     console.log()
    })
    deleted()
}
displayGalleryModals()

/************************* Delete photo modale **********************************/

async function deleted (){
    const trashAll = document.querySelectorAll(".fa-trash-can")
    trashAll.forEach(trash =>{
        trash.addEventListener("click", (event)=> {   
            event.preventDefault   
            const id = trash.id
            const init ={
                method: "DELETE",
                headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNTg2NjQ3NywiZXhwIjoxNzE1OTUyODc3fQ.CtF1XuA1ReYczX8JhF1khRIjcVZFkHVSSz0r3e-Icv8'}
            }
            fetch("http://localhost:5678/api/works/"+id,init)  
            .then (res => {
                console.log(res)
                /* Suppression d'image dans la galerie */
                displayGalleryModals()
                getWorks()
            })
            .catch (error => {
                console.error(error)
            })             
        })            
    })
}

/************************** Preview photo modale  *****************/

const icone = document.querySelector(".ajoutPhoto i")
const label = document.querySelector(".ajoutPhoto label")
const buttonAjout = document.querySelector(".modalsAjout input")
const previewImg = document.querySelector(".ajoutPhoto img")
const fileTypeInfoSpan =document.querySelector(".ajoutPhoto span")

buttonAjout.addEventListener(("change"),()=>{
    const file = buttonAjout.files[0];
    console.log(file);
    if(file){
        const reader = new FileReader
        reader.onload = function (e){
            previewImg.src = e.target.result
            previewImg.style.display = "flex"
            fileTypeInfoSpan.style.display ="none"
            buttonAjout.style.display ="none"
            label.style.display ="none"
            icone.style.display ="none"
        }
        reader.readAsDataURL(file)
    }
})
        
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

/******* Message erreur si les champ de modal ne sont pas remplie *****************************************/

const titre = document.querySelector("form input")
const error = document.querySelector(".formulairePhoto span")
console.log(error);
titre.addEventListener(("change"), ()=>{
    if (titre.value === ""){
        error.innerHTML = "Veuillez inserer un titre"
    }else{
        error.innerHTML = ""
    }
    console.log(titre.value)
})

/********************** Envoi du formulaire  ********************************/

