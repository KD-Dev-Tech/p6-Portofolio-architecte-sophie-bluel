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
    });
});

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

/************************** Ajout photo modale  ************************/


        