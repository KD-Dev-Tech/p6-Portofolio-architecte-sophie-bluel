/******************* Variable General *****************************************/

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
const buttonValidate = document.querySelector("form .buttonValider")
const test =document.querySelector("form button")

// buttonValidate.disabled = true

/******************* Affichage photos dans la modal *************************/

async function displayGalleryModals () {                                                        // Fonction asynchrone qui Affiche les photo dans la modal
    galleriePhoto.innerHTML = ""                                                                // Vide la gellerie pour eviter les doublons
    const gallerie = await getWorks ()                                                          // On stock la reponse de getworks
    gallerie.forEach( (work) => {                                                               // Creation d'une boucle qui parcourt chaque element de gallerie
    const figure = document.createElement("figure")                                             // Creation de  l'element <figure> pour contenir l'image 
    const img = document.createElement("img")                                                   // Creation de l'element <img> pour afficher l'image 
    const span = document.createElement("span")                                                 // Creation de l'element <span> pour contenir l'icone
    const trash = document.createElement("i")                                                   // Creation de l'element <i> pour afficher l'icone de suppression
    galleriePhoto.appendChild(figure)                                                           // Ajout de l'element <figure> à gelleriePhoto 
    figure.appendChild(span)                                                                    // Ajout de l'element <span> à <figure>
    figure.appendChild(img)                                                                     // Ajout de l'lement <img> à <figure>
    span.appendChild(trash)                                                                     // Ajout de l'element <i> (icone) à <span> 
    trash.classList.add("fa-solid", "fa-trash-can")                                             // Ajout de l'icone 
    figure.classList.add("displayImg")                                                          // Ajout de la class "displayImg" à figure pour le style de l'image 
    span.classList.add("trash")                                                                 // Ajout de la class "trash" a <span> pour le style du conteneur d'icone 
    trash.id = work.id                                                                          // Ajout de l'id de work à l'icone pour identifier l'image 
    img.src = work.imageUrl                                                                     // Definit la source de l'image a partir de l'URL de l'image 
    //  console.log(img.src)
    })
    deleted()                                                                                   // Appel de la fonction pour les suprimer dans la modal  
}
displayGalleryModals()

/************************* Delete photo modale **********************************/

async function deleted (){                                                                                                  // Fonction asynchrone qui supprime les photos
    const trashAll = document.querySelectorAll(".fa-trash-can")                                                             // Recuperation de toute les icones de suppression
    trashAll.forEach(trash =>{                                                                                              // Creation d'une boucle qui parcourt chaque icone  
        trash.addEventListener("click", ()=> {                                                                              // Ajout d'un ecouteur d'evenement quand on clique sur l'icone
            const id = trash.id                                                                                             // Recuperation de l'id de l'element a l'icone 
            const init ={                                                                                                   // Option de requete
                method: "DELETE",                                                                                           // Methode DELETE
                headers: { 'Authorization': `Bearer ${token}`}                                                              // En-tete contenant le Token d'authentification
            }       
             fetch("http://localhost:5678/api/works/"+id,init)                                                              // On fait la requete a l'API pour supprimer l'element associer a l'id de l'icone  
            .then (res => {                                                                                                 // Gestion de la reponse a la requete 
                console.log("L'image a bien etait supprimé voici le status: ",res.status, " et son numero id: ",id)         
                /* Suppression d'image dans la galerie */
                displayGalleryModals()                                                                                      // Actualise la galerie photo dans la modal
                displayWorks()                                                                                              // Actualise la galerie photo sur la page principal
            })
            .catch (error => {                                                                                              // Gestion des erreur de la requete 
                console.error(error)                                                                                         
            })             
        })            
    })
}

/************************** Preview photo modale  *****************/

function preview (){                                                                            // Function qui affiche la preview de l'image lors de l'ajout 
buttonAjout.addEventListener(("change"),()=>{                                                   // Ajout d'un ecouteur d'evenement lorsqu'un fichier est selectioné pour le telechargement  
    const file = buttonAjout.files[0];                                                          // Récuperation du fichier 
    // console.log(file);
    if(file){                                                                                   // Verifie si ficher est selectioné 
        const reader = new FileReader()                                                         // creation d'un objet FileReader pour lire le contenue du fichier 
        reader.onload = function (e){                                                           // Fonction callback déclenché quand le chargement du fichier est fini 
            previewImg.innerHTML=""                                                             // vide le contenu 
            previewImg.src = e.target.result                                                    // defint la source de previewImg comme des donneé de l'image 
            // console.log(previewImg); 
            previewImg.style.display = "flex"                                                   // Affiche l'image
            span.style.display ="none"                                                          // Masque le texte
            buttonAjout.style.display ="none"                                                   // Masque le boutton
            label.style.display ="none"                                                         // Masque le label de boutton
            icone.style.display ="none"                                                         // Masque l'icone de fond
        }
        reader.readAsDataURL(file)                                                              // lit les donneé de file en tant qu'URL de donnée (il les connverti)
        console.log(file)                                                                       
    }
})
}
preview()

/************************** Reset Preview photo modale  *****************/

function resetPreview () {                                                                      // Fonction qui reset la preview 
    previewImg.style.display="none"                                                             // Supprime l'image
    span.style.display ="flex"                                                                  // Affiche le texte 
    buttonAjout.style.display ="none"                                                           // 
    label.style.display ="flex"                                                                 // Affiche le label
    icone.style.display ="flex"                                                                 // Affiche l'icone de fond 
}

/******* Boutton valider change de couleur si validation des champs *************/
 
 function validateForm() {                                                                      // Fonction qui change de couleur le boutton valier si les champ sont validés
    verifChamp()                                                                                // appel de la fonction verifChamp qui verifie les champ de titre et photo 
    form.addEventListener("input",() => {                                                       // Ajout d'un ecouteur d'evenement sur le formulaire quand on le remplit
        errorForm.innerHTML = ""                                                                // vide tout les messages erreur
    if (!title.value =="" && !buttonAjout.files.length ==""){                                   // verifie si dans le champ titre et l'ajout de photo sont remplis
        buttonValidate.classList.remove ("buttonValider")                                       // supprime la class du bouton qui le rend gris  
        buttonValidate.classList.add ("buttonValiderOk")                                        // Ajoute une class au boutton pour le faire apparaitre en vert
    }else{                                                                                      // Sinon, si les champs sont vide 
        buttonValidate.classList.remove("buttonValiderOk")                                      // Supprime la class qui faisait apparaitre le boutton en vert 
        buttonValidate.classList.add("buttonValider")                                           // Ajoute une class qui le remet en gris
        }
   }) 
}   
validateForm()

/******* Message erreur si les champ titre n'est pas remplie *************/

async function verifChamp () {                                                                  // Fonction asynchrone qui verifie les champs de titre et de photo
    form.addEventListener("submit",() =>{                                                       // Ajout d'un ecouteur d'evenement sur le formulaire au moment de la soumission 
        let isValid = true                                                                      // Declarer une variable pour suivre la validité des champs
        errorForm.innerHTML = ""                                                                // Vide tout les message d'erreur 
    if (title.value === "") {                                                                   // verifie Si le champ titre est vide  
        errorForm.innerHTML += "Veuillez insérer un titre. "                                    // Affiche un message erreur
        isValid = false                                                                         // Met a jour la variable isValid à false
    }
    if (!buttonAjout.files.length) {                                                            // Verifie Si il n'y a pas de fichier ajouté
        errorForm.innerHTML += "Veuillez ajouter une image."                                    // Affiche un message d'erreur
        isValid = false                                                                         // Met a jour la variable isValid à false
    }
    return isValid                                                                              // Retourne la validité des champs 
    })
}

/*************** changement de couleur Button validation de formulaire  ****************/

function butttonValidation (isValid){                                                           // Fonction qui ajuste la couleur en fonction de la validité du formulaire 
    if (isValid){                                                                               // verifie si le paremetre isValid est true 
        buttonValidate.classList.remove ("buttonValider")                                       // supprime la class du bouton qui le rend gris
        buttonValidate.classList.add ("buttonValiderOk")                                        // Ajoute une class au boutton pour le faire apparaitre en vert
    }else{                                                                                      // Sinon, si isValid est false
        buttonValidate.classList.remove("buttonValiderOk")                                      // Supprime une class au boutton qui le faisait apparaitre en vert
        buttonValidate.classList.add("buttonValider")                                           // Ajout de la class du bouton qui le rend gris
    }
}


/****************** Affichage categorie Input Select ****************/

async function selectCategoryModal (){                                                          // Fonction asynchrone qui affiche les categories par get filter dans le select  
    const select = document.querySelector("form select")                                        // Recupere l'element <select> pour y inclure les categorie 
    const categorie = await getFilters()                                                        // On stock les donneé recuperé de getFilter
    categorie.innerHTML=""                                                                      // Vide le contenu de categorie 
    categorie.forEach(categorie => {                                                            // Creation d'une boucle qui parcourt chaque element de la liste categorie 
        const option = document.createElement("option")                                         // creation d'un element <option> pour chaque categorie
        option.value = categorie.id                                                             // Definit la valeur de l'option sur l'id de la categorie
        select.appendChild(option)                                                              // Ajout de la balise <option> da la balise <select>
        option.textContent = categorie.name                                                     // Definit le texte de l'option sur le nom de la categorie
    })
} 
selectCategoryModal()

/******************** Reset Formulaire  *******************************************/

function resetForm (){                                                                          // Fonction qui reinitialise le formulaire 
    form.reset()                                                                                // Reinitialise tout les champs du formulaire  
    errorForm.innerHTML=""                                                                      // Vide tout les messages d'erreur 
}

/********************** Envoi du formulaire  ********************************/

async function submitForm(e) {                                                                  // Fonction asynchrone qui envoie la requete de l'API pour l'envoie des projets 
    e.preventDefault()                                                                          // Empeche le rechargement de la page lor de la soumission du formulaire 
    try{                                                                                        // Execute le bloc de code suivant 
            const formData = new FormData();                                                    // Crée un nouvel objet FormData pour stocker les donneé du formulaire 
            formData.append('image', buttonAjout.files[0]);                                     // Ajoute le fichier image selectioné dans le champ de fichier
            formData.append('title', title.value);                                              // Ajoute le titre depuis le champ de saisie 
            formData.append('category', category.value);                                        // Ajoute la categorie depuis le champ de selection 
            
            const response = await fetch('http://localhost:5678/api/works/', {                  // Envoie de la requete Post pour la creation d'un nouveau projet 
            method:'POST',                                                                      // Methode POST pour envoyer les donneés
            headers:{                                                                           // On ajoute le token dans l'en-tete 
                Authorization: `Bearer ${token}`                                                
            },
            body:formData                                                                       // On utilise les données de formData comme corps de la requete 
        })
        if (response.ok) {                                                                      // Si la reponse de l'API est ok 
            console.log("l'envoie du Fichier:",buttonAjout.name,"Titre:",title.value,"Categorie:",category.value,"a etait effectuer voici le statut:",response.status)
            await displayGalleryModals()                                                        // Met a jour l'affichage des projet dans la modal
            await displayWorks()                                                                // Met a jour l'affichage des projets dans la page principal
            closeModal(containerModals)                                                         // Ferme la modal principal
            closeModal(modalsAjout)                                                             // Ferme la modal ajoutPhoto
            openModal(modalsGallery)                                                            // ouvre la modal Gallery
        } else {                                                                                // Sinon, Si la reponse n'est pas ok 
            console.log("Probleme de recuperation de donées voici le satus: ",response.status)
        }
    } catch (error) {                                                                           // Capture et gere les erreurs pendant l'execution du bloc try 
        console.error('Erreur lors de la récupération des données :', error)                   
    } 
}
form.addEventListener("submit", submitForm)                                                     // Ajout d'un ecouteur d'evenenment pour soumettre le formulaire lors de subitForm


/************** Ouverture /  Fermeture Modals ************************/

function openModal (modal){                                                                     // Fonction qui fait apparaitre la modal
    modal.style.display ="flex"                                                                 // Definit le style d'affichage sur flex
} 

function closeModal (modal){                                                                    // Fonction qui ferme la modal 
    modal.style.display = "none"                                                                // Definit le style d'affichage sur none 
}

/********* Gestion des événements pour la fermeture et la navigation dans les modals ********/  

xmark.forEach(xmark => {                                                                        // Pour chaque icone de fermeture dans les modals 
    xmark.addEventListener("click", () => {                                                     // Ajout d'un ecouteur d'evenement sur l'icone de fermeture quand on clique 
        closeModal(containerModals)                                                             // Ferme la modal principal
        closeModal(modalsAjout)                                                                 // Ferme la modal ajoutPhoto
        openModal(modalsGallery)                                                                // Ouvre la modal Gallery
        butttonValidation()                                                                     // Met a jour le boutton de validation 
    })
})

/********** Pour la flèche de retour dans les modals ********************/

arrow.addEventListener(("click"), () =>{                                                        // Ajout d'un écouteur d'événement pour le retour à la galerie lors du clic sur la flèche de retour 
    closeModal(modalsAjout)                                                                     // Ferme la modal ajoutPhoto
    openModal(modalsGallery)                                                                    // Ouvre la modal Gallery
    butttonValidation()                                                                         // Met a jour le boutton de validation 
})

/****************** Fermeture du modal lors du clic a l'exterieur *****************/ 

containerModals.addEventListener("click", (e) => {                                              // Ajout d'un écouteur d'événement pour la fermeture du modal lors du clic a l'exterieur du modal 
    if(e.target === containerModals ){                                                          // Si le clic est en dehor de la modal
        closeModal(containerModals)                                                             // Ferme la modal principal
        openModal(modalsGallery)                                                                // Ouvre la modal Gallery
        closeModal(modalsAjout)                                                                 // Ferme la modal ajoutPhoto
        butttonValidation()                                                                     // Met a jour le boutton de validation 
    }
// console.log(e.target.className);
})

/*********************** Pour le bouton "Modifier" **********************/ 

buttonModif.addEventListener("click",() => {                                                    // Ajout d'un écouteur d'événement pour l'ouverture du modal lors du clic sur le bouton "Modifier"
    openModal(containerModals)                                                                  // Ouvre la modal principal
})

/*******************  Pour le bouton "Ajouter une photo" *****************/

buttonPhoto.addEventListener("click",() => {                                                    // Ajout d'un écouteur d'événement pour l'ajout de photo lors du clic sur le bouton "Ajouter une photo" 
    openModal(modalsAjout)                                                                      // Ouvre la modal ajoutPhoto
    closeModal(modalsGallery)                                                                   // Ferme la modal Gallery
    resetForm()                                                                                 // Reinitialise le formulaire
    resetPreview()                                                                              // Reinitialise l'apercut de limage de ma modal ajoutPhoto
    butttonValidation()                                                                         // Met a jour le boutton de validation 
})









