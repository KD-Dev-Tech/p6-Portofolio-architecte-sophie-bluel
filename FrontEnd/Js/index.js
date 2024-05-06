
/************ Variables General ***********/

const gallery = document.querySelector(".gallery")
const filtres = document.getElementById("filtre")



/************** Fonction qui appel l'API  image **********************/

async function getWorks() {
    const response = await fetch ("http://localhost:5678/api/works")
    return await response.json()
}
getWorks()

/************ Affichage des Images dans le DOM ***************/

async function works() {
    const arrayWorks = await getWorks()
    arrayWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        img.src = work.imageUrl
        figcaption.textContent = work.title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
        figure.classList.add(".gallery")
    })
}
works()

/**************** Fonction qui appel l'API categorie  **********************/

async function getFilters() {
    const am = await fetch ("http://localhost:5678/api/categories")
    return await am.json()
    
}
getFilters()

/*************** Affichage Des bouton filtres ********************/

async function ButtonFilters() {
    const categories = await getFilters()
    categories.forEach(filter => {
        const button = document.createElement("button")
        button.textContent = filter.name
        button.dataset.id = filter.id
        filtres.appendChild(button)
        button.addEventListener("click", () => {
            filterWorks(filter.id)
        })
    })
}
ButtonFilters()

function filterWorks(works,category) {
    const filterWorks = works.filter ( (work) => work.category.name === category)
    console.log("Filtrage des travaux pour l'ID du filtre :", filterId);
   const buttons = document.querySelectorAll (".filtre button")
}





