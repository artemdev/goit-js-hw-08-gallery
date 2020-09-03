import pictures from '/gallery-items.js';
const gallery = document.querySelector(".gallery")
const modal = document.querySelector(".lightbox")
const closeModalBtn = document.querySelector('button[data-action="close-modal"]')
const closeModalWindow = document.querySelector('.lightbox__overlay')
const modalImage =   document.querySelector('.lightbox__image')

//gallery
pictures.forEach(image => {
    //create elements
    const $li = document.createElement('li')
    const $img = document.createElement('img')
    $img.classList.add("gallery__image")
    $img.src = image.preview
    $img.dataset.source = image.original
    $img.alt = image.description
    const $a = document.createElement('a')
    $a.dataset.original = image.original
    $a.classList.add("gallery__link")
    $a.href = image.original
    //append elements
    $li.append($a)
    gallery.append($li) 
    $a.append($img)

});

const openModal = (event) => {
    event.preventDefault()
    // console.log()
    if(event.target.className == "gallery__image") {
        //make modal visible
        modal.classList.replace("lightbox", "lightbox.is-open")
        modalImage.src = event.target.dataset.source
    }
}

const closeModal = () => { 
    //make modal invisible
    modal.classList.replace("lightbox.is-open", "lightbox")
}

//       
gallery.addEventListener("click", openModal)
closeModalBtn.addEventListener('click', closeModal)
closeModalWindow.addEventListener('click', closeModal)
