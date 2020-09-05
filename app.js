import pictures from './gallery-items.js'; //images data

//init
const gallery = document.querySelector(".gallery")
const modal = document.querySelector(".lightbox")
const closeModalBtn = document.querySelector('button[data-action="close-modal"]')
const modalImage =  document.querySelector('.lightbox__image')
const maxSliderImages = 8

//functions
const createGalleryItem = (image, index, array) => {
    //init
    const $li = document.createElement('li')
    const $img = document.createElement('img')
    $img.classList.add("gallery__image")
    $img.src = image.preview
    $img.dataset.source = image.original
    $img.alt = image.description
    $img.dataset.number = index
    const $a = document.createElement('a')
    $a.dataset.original = image.original
    $a.classList.add("gallery__link")
    $a.href = image.original
    //append
    $li.append($a)
    $a.append($img)
    gallery.append($li) 
}

//create gellery
pictures.forEach(createGalleryItem);

const openModal = (event) => {
    event.preventDefault()
    // validation
    if(event.target.className !== "gallery__image") {
        return
    }

    //make modal visible
    modal.classList.replace("lightbox", "lightbox.is-open")
    modalImage.dataset.number = event.target.dataset.number
    largeImageURL(event.target.dataset.source)
}

function updateCurrentSliderImage(event) {
    if(event.code === "ArrowRight" || event.code === "ArrowLeft" ) {
    //initialization
    let currentIndex = parseInt(modalImage.dataset.number)
    const nextIndex = nextNumber(currentIndex);
    const prevIndex = prevNumber(currentIndex);
    //change current index
    if(event.code === "ArrowRight" ) {
        changeModalUrl(getUrlBy(nextIndex))
    }
    console.log(`next index` + nextIndex)

    if(event.code === "ArrowLeft" ) {
        changeModalUrl(getUrlBy(prevIndex))
    }
}
    //change current picture
}


function changeModalUrl(nextImageUrl) {
    modalImage.setAttribute('src', nextImageUrl)
}
function getUrlBy(index) {
    modalImage.dataset.number = index
    return pictures[index].original
}

function largeImageURL(newUrl) {
    modalImage.src = newUrl
}

const prevNumber = (current) => {
    return  current === 0 ? maxSliderImages : current - 1
}

const nextNumber = (current) => {
    return current === maxSliderImages ? 0 : current + 1
}


const closeModal = () => { 
    modal.classList.replace("lightbox.is-open", "lightbox")
}


//integration
window.addEventListener('keydown', updateCurrentSliderImage);
gallery.addEventListener("click", openModal)
closeModalBtn.addEventListener('click', closeModal)