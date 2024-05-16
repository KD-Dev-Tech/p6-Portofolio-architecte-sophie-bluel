const containerModals = document.querySelector (".containerModals")
const xmark = document.querySelector (".fa-xmark")
const modalsGallery = document.querySelector (".modalsGallery")
const buttonPhoto = document.querySelector (".buttonPhoto")
const buttonModif = document.querySelector (".button-modifier") 
const galleriePhoto = document.querySelector (".galleryModals")
const token = localStorage
console.log(token);

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

/************************* Delete **********************************/

async function deleted (){
    const trashAll = document.querySelectorAll(".fa-trash-can")
    trashAll.forEach(trash =>{
        trash.addEventListener("click", ()=> {   
            console.log(token);    
            const id = trash.id
            const init ={
                method: "DELETE",
                headers: {
                    "Authorization": "bearer  "  
                }
            }
            fetch("http://localhost:5678/api/works/"+id,init)
            
                
        })            
    
    })

}
        