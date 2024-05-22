
/************ Variables General ***********/

const gallery = document.querySelector(".gallery")
const filtres = document.querySelector(".filtre")



/************ Fonction qui appel l'API des works  *********/

async function getWorks() {                                             // Fonction asynchrone
    const response = await fetch ("http://localhost:5678/api/works")    // Attend la promesse de recuperation de fetch et la stock dans la variable 
    return await response.json()                                        // Retourne la response de l'objet recupéré une fois attendu et le convertit en json
}
getWorks()

/************ Affichage des Images dans le DOM ***************/

async function displayWorks () {                                        // Fonction Asynchrone
    const works = await getWorks()
    gallery.innerHTML=""                                                // Stock les donné recuperé attendu de getWorks dans une variable works
    works.forEach((work) => {                                           //  forEach parcours chaque element du tableau works
        createWorks(work)                                               // appel de la function createWorks
    })
    // console.log(works)
}
displayWorks()

/******* Fonction qui creer la structure de l'image  ********/ 

async function createWorks(work) {
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

/********* Fonction qui appel l'API categorie  **************/

async function getFilters() {
    const response = await fetch ("http://localhost:5678/api/categories")
    return await response.json()
}


/********** Affichage Des bouton filtres ****************/

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

/****************** Filtrer au click par categories ***********/

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
                    createWorks(work)  
                })
            }else{
                displayWorks()
            }
            // console.log(btnId)
        })
    })
    // console.log(buttons);
}
 filterWork()
 

 /*********** Connexion / Deconnexion Utilisateur mode edition ******************/

// console.log(homEdition);

function logout () {
    const token = localStorage.getItem("token")                 // Récupération du token d'authentification
    const login = document.querySelector("nav .btnlog")         // Récuperation de la balise login
    
    if (token) {                                                // si le token est enregistré 
        login.textContent = "Logout"                            // changement de texte du Login
        login.setAttribute ("href", "#")                        // enlevement de de l'attribut lien 
        filtres.remove("")                                      // enlevement des filtres de catégorie
        const homEdition = document.querySelector ("div")       // Récuperation de la div
        const icon = document.createElement("i")                // Creation de la balise icone
        const edit = document.createElement("span")             // Creation de la balise span
        homEdition.classList.add("edition")                     // Ajout d'une class a la div 
        homEdition.appendChild(icon)                            // div parent de i
        homEdition.appendChild(edit)                            // div parent de Span
        icon.classList.add("fa-regular", "fa-pen-to-square")    // Ajout de l'icone
        edit.textContent ="Mode édition"   

        const projet = document.querySelector("#portfolio div")  
        projet.classList.add("modif-edition")
        const buttonModif = document.createElement("button")
        const iconModif = document.createElement("i")
        projet.appendChild(iconModif)
        projet.appendChild(buttonModif)
        iconModif.classList.add("fa-regular", "fa-pen-to-square")
        buttonModif.textContent ="modifier" 
        buttonModif.classList.add("button-modifier")

        login.addEventListener (("click"), () => {              // ecouteur d'evenement sur le click
             localStorage.removeItem("token")                   // Enlevement du token
             window.location.href = "index.html"                // retour Lien origin Index.html 
                })
    }
    
}
logout()