import pictures from '/gallery-items.js'; //images data

//init
const gallery = document.querySelector(".gallery")
const modal = document.querySelector(".lightbox")
const closeModalBtn = document.querySelector('button[data-action="close-modal"]')
const modalImage =  document.querySelector('.lightbox__image')
const maxSliderImages = pictures.length - 1

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

    //child element by index
    const nextImageUrl = pictures[nextIndex].original

    //change current index
    if(event.code === "ArrowRight" ) {
         moveTo(nextIndex)
    }

    if(event.code === "ArrowLeft" ) {
        moveTo(prevIndex)
    }
    //change current picture
    changeModalUrl(nextImageUrl)
    }
}


function changeModalUrl(nextImageUrl) {
    modalImage.setAttribute('src', nextImageUrl)
}
function moveTo(index) {
    modalImage.dataset.number = index
}

function largeImageURL(newUrl) {
    modalImage.src = newUrl
}

const prevNumber = (current) => {
    const prev = current - 1
    return  prev < 0 ? maxSliderImages : prev
}

const nextNumber = (current) => {
    const next = current + 1
    return next > maxSliderImages ? 0 : next
}


const closeModal = () => { 
    modal.classList.replace("lightbox.is-open", "lightbox")
}


//integration
gallery.addEventListener('keydown', updateCurrentSliderImage);
gallery.addEventListener("click", openModal)
closeModalBtn.addEventListener('click', closeModal)