
/************ Variables General ***********/

const gallery = document.querySelector(".gallery")
const filtres = document.querySelector(".filtre")



/************** Fonction qui appel l'API  image **********************/

async function getWorks() {
    const response = await fetch ("http://localhost:5678/api/works")
    return await response.json()
}
getWorks()

/************ Affichage des Images dans le DOM ***************/

async function createWorks (){
    const arrayCategories = await getWorks()
    arrayCategories.forEach((work) => {
        displayWorks(work)
    })
}
createWorks()

function displayWorks(work) {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        img.src = work.imageUrl
        figcaption.textContent = work.title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
        figure.classList.add(".gallery")   
}


/**************** Fonction qui appel l'API categorie  **********************/

async function getFilters() {
    const response = await fetch ("http://localhost:5678/api/categories")
    return await response.json()
}


/*************** Affichage Des bouton filtres ********************/

async function ButtonFilters() {
    const buttons = await getFilters()
    // console.log(buttons);
    buttons.forEach(category => {
        const btn = document.createElement("button")
        btn.textContent = category.name
        btn.id = category.id
        filtres.appendChild(btn)
        //  console.log(buttons)
    })
}
ButtonFilters()

/****************** Filtrer au click par categories *****************************/

async function filterWork() {
    const arrayCategories = await getWorks()
    // console.log(arrayCategories);
    const buttons = document.querySelectorAll(".filtre button")
    buttons.forEach((button) =>{
        button.addEventListener("click", (event) => {
            btnId = event.target.id
            gallery.innerHTML = ""
            if (btnId !== "0"){
                const filteredWorks = arrayCategories.filter((work) => {
                return work.categoryId == btnId                  
                })               
                filteredWorks.forEach ((work) => {
                    displayWorks(work)  
                })
            }else{
                createWorks()
            }
            // console.log(btnId)
        })
    })
    // console.log(buttons);
}
 filterWork()
 


 /******************************** Connexion Utilisateur mode edition ******************************/

const modeEdition = document.querySelector("header div")

function logout () {
    const token = localStorage.getItem("token") // Récupération du token d'authentification
    const login = document.querySelector("nav .btnlog") // Récuperation de la balise login
    
    if (token) {
        login.textContent = "Logout"
        login.removeAttribute ('href')
        filtres.remove("")
        login.addEventListener (("click"), () => {
             localStorage.removeItem("token")
             window.location.href = "index.html"           
                })
    }
       
        
    





}
logout()