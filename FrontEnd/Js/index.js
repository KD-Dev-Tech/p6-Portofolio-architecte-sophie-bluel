/************ Variables General ***********/

const gallery = document.querySelector(".gallery")                      // Recuperation dans le DOM de la div portant la class gallery qui sera stocké dans une variable nommé gallery
const filtres = document.querySelector(".filtre")                       // Recuperation dans le DOM de la div portant la class filtre qui sera stocké dans une variable nommé filtres


/************ Fonction qui appel l'API des works  *********/

async function getWorks() {                                             // Fonction asynchrone qui appelle l'API pour les routes 
    const response = await fetch ("http://localhost:5678/api/works")    // Attend la promesse de recuperation de fetch et la stock dans la variable 
    return await response.json()                                        // Retourne la response de l'objet recupéré une fois attendu et le convertit en json
}
getWorks()

/************ Affichage des Images dans le DOM ***************/

async function displayWorks () {                                        // Fonction Asynchrone qui affiche les images  
    const works = await getWorks()                                      // Stock les donné récuperé de get works dans une variable works
    gallery.innerHTML=""                                                // Vide la gallery image pour ne pas faire de doublons
    works.forEach((work) => {                                           // creation d'une boucle pour chaque works  
        createWorks(work)                                               // Appel de fonction createWorks pour chaque works
    })
    // console.log(works)
}
displayWorks()

/******* Fonction qui creer la structure de l'image  ********/ 

function createWorks(work) {                                            // Fonction qui creer la structure de l'image 
    const figure = document.createElement("figure")                     // Creation d'un element <figure> dans le DOM
    const img = document.createElement("img")                           // Creation d'un element <img> dans le DOM pour afficher l'image
    const figcaption = document.createElement("figcaption")             // Creation d'un element <figcaption> dans le DOM pour afficher le titre
    img.src = work.imageUrl                                             // Attribution de l'URL de l'image récupérée à l'élément <img>
    figcaption.textContent = work.title                                 // Attribution du titre récupéré à l'élément <figcaption>
    figure.appendChild(img)                                             // Ajout de l'élément <img> à l'élément <figure>
    figure.appendChild(figcaption)                                      // Ajout de l'élément <figcaption> à l'élément <figure>
    gallery.appendChild(figure)                                         // Ajout de l'élément <figure> à l'élément <gallery>
    figure.classList.add(".gallery")                                    // Ajout d'une class gallery a l'element <figure> 
}

/********* Fonction qui appel l'API categorie  **************/

async function getFilters() {                                               // Fonction asynchrone qui appelle l'API pour les categories
    const response = await fetch ("http://localhost:5678/api/categories")   // Attend la promesse de recuperation de fetch et la stock dans la variable 
    return await response.json()                                            // Retourne la response de l'objet recupéré une fois attendu et le convertit en json
}


/********** Affichage Des bouton filtres ****************/

async function ButtonFilters() {                                        // Fonction asynchrone qui affiche les bouttons pour les categories
    const buttons = await getFilters()                                  // Stock les donnée récuperé de getFilters dans une variable buttons
    // console.log(buttons);
    buttons.forEach(category => {                                       // Creation du boucle qui parcour chaque element de buttons
        const btn = document.createElement("button")                    // creation d'un element <button> dans le DOM
        btn.textContent = category.name                                 // Attribution du nom récupéré a l'element <btn>
        btn.id = category.id                                            // Attributuin de id récupéré de <btn>
        filtres.appendChild(btn)                                        // Ajout de l'element <btn> a l'element <filtres>
        //  console.log(buttons)
    })
}
ButtonFilters()

/****************** Filtrer au click par categories ***********/

async function filterWork() {                                               // Fonction asynchrone qui permet de filtré par categorie 
    const arrayCategories = await getWorks()                                // Stock les donneé récupéré de getworks dans arrayCategories
    // console.log(arrayCategories);            
    const buttons = document.querySelectorAll(".filtre button")             // Sélectionne tous les boutons de filtre dans le DOM
    buttons.forEach((button) =>{                                            // Boucle à travers chaque bouton dans la NodeList buttons avec l'argument button
        button.addEventListener("click", (event) => {                       // Ajout d'un écouteur d'événements sur le clic de chaque bouton
            btnId = event.target.id                                         // Récupération de l'ID du bouton sur lequel l'utilisateur a cliqué
            gallery.innerHTML = ""                                          // Vide la gallery pour ne pas faire de doublons
            if (btnId !== "0"){                                             // Vérification si l'ID du bouton est différent de "0"
                const filteredWorks = arrayCategories.filter((work) => {    // Filtrage des œuvres en fonction de la catégorie sélectionnée
                return work.categoryId == btnId                             // Retourne les œuvres dont l'ID de catégorie correspond à btnId
                })               
                filteredWorks.forEach ((work) => {                          // Boucle qui parcour chaque filteredWorks avec l'argument work
                    createWorks(work)                                       // Appel de la fonction createWorks pour chaque filteredWorks
                })
            }else{                                                          // Si l'ID du bouton est "0", afficher toutes les œuvres
                displayWorks()                                              // Appel de la fonction displayWorks pour afficher toutes les œuvres
            }
            // console.log(btnId)
        })
    })
    // console.log(buttons);
}
 filterWork()
 

 /*********** Connexion / Deconnexion Utilisateur mode edition ******************/

// console.log(homEdition);

function logout () {                                                    // Fonction qui permet d'avoir le mode edition 
    const token = localStorage.getItem("token")                         // Récupération du token d'authentification
    const login = document.querySelector("nav .btnlog")                 // Récuperation de la balise login
    
    if (token) {                                                        // si le token est present 
        login.textContent = "Logout"                                    // changement du texte de "Login" à "Logout"
        login.setAttribute ("href", "#")                                // Suppression du lien de "Logout" pour empecher de retourner sur index.htmml
        filtres.remove("")                                              // Suppression des filtres de catégorie
// Banniere Mode Edition        
        const homEdition = document.querySelector ("div")               // Récuperation de la balise <div> dans le DOM pour creé la banniere mode edition
        const icon = document.createElement("i")                        // Creation de la balise <i> pour l'icone
        const edit = document.createElement("span")                     // Creation de la balise <span> pour le texte
        homEdition.classList.add("edition")                             // Ajout d'une class "edition" a la balise <div> 
        homEdition.appendChild(icon)                                    // Ajout de l'icone à la banniere
        homEdition.appendChild(edit)                                    // Ajout du texte à la banniere
        icon.classList.add("fa-regular", "fa-pen-to-square")            // Integration de l'icone
        edit.textContent ="Mode édition"                                // Ajout du texte qui affichera mode edition
// Bouton Modifier 
        const projet = document.querySelector("#portfolio div")         // Recuperation de la balise <div> dans le DOM  pour creer le bouton modifier 
        projet.classList.add("modif-edition")                           // Ajout d'unne class a la <div> pour le style 
        const buttonModif = document.createElement("button")            // Creation de la balise <button> 
        const iconModif = document.createElement("i")                   // Creationde  la balise <i> pour l'icone du boutton
        projet.appendChild(iconModif)                                   // Ajout de l'icone dans la balise <div>
        projet.appendChild(buttonModif)                                 // Ajout du button dans la balise <div> 
        iconModif.classList.add("fa-regular", "fa-pen-to-square")       // Integration de l'icone 
        buttonModif.textContent ="modifier"                             // Ajout du texte au boutton 
        buttonModif.classList.add("button-modifier")                    // Ajout d'une class au button pour le style 

        login.addEventListener (("click"), () => {                      // Écouteur d'événement pour le bouton de déconnexion
             localStorage.removeItem("token")                           // Suppression du token
             window.location.href = "index.html"                        // Retour sur la page d'Accueil
                })
    }
    
}
logout()