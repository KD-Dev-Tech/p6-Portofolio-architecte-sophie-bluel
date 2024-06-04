/************ Variables General ***********/

const gallery = document.querySelector(".gallery")                      
const filtres = document.querySelector(".filtre")                       


/************ Fonction qui appel l'API des works  *********/

async function getWorks() {                                              
    const response = await fetch ("http://localhost:5678/api/works")     
    return await response.json()                                        
}


/************ Affichage des Images dans le DOM ***************/

async function displayWorks () {                                         
    const works = await getWorks()                                      
    gallery.innerHTML=""                                                
    works.forEach((work) => {                                             
        createWorks(work)                                               
    })
    
}
displayWorks()

/******* Fonction qui creer la structure de l'image  ********/ 

function createWorks(work) {                                            
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
    
    buttons.forEach(category => {                                      
        const btn = document.createElement("button")                   
        btn.textContent = category.name                               
        btn.id = category.id                                           
        filtres.appendChild(btn)                                       
        
    })
}
ButtonFilters()

/****************** Filtrer au click par categories ***********/

async function filterWork() {                                             
    const arrayCategories = await getWorks()                                           
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
        })
    })
    
}
 filterWork()
 

 /*********** Connexion / Deconnexion Utilisateur mode edition ******************/

function logout () {                                                    
    const token = localStorage.getItem("token")                         
    const login = document.querySelector("nav .btnlog")                 
    
    if (token) {                                                         
        login.textContent = "Logout"                                    
        login.setAttribute ("href", "#")                                
        filtres.remove("")                                              
// Banniere Mode Edition        
        const homEdition = document.querySelector ("div")               
        const icon = document.createElement("i")                        
        const edit = document.createElement("span")                     
        homEdition.classList.add("edition")                            
        homEdition.appendChild(icon)                                    
        homEdition.appendChild(edit)                                    
        icon.classList.add("fa-regular", "fa-pen-to-square")           
        edit.textContent ="Mode édition"                                
// Bouton Modifier 
        const projet = document.querySelector("#portfolio div")          
        projet.classList.add("modif-edition")                           
        const buttonModif = document.createElement("button")             
        const iconModif = document.createElement("i")                   
        projet.appendChild(iconModif)                                   
        projet.appendChild(buttonModif)                                 
        iconModif.classList.add("fa-regular", "fa-pen-to-square")        
        buttonModif.textContent ="modifier"                              
        buttonModif.classList.add("button-modifier")                    

        login.addEventListener (("click"), () => {                      
             localStorage.removeItem("token")                           
             window.location.href = "index.html"                        
                })
    }
    
}
logout()