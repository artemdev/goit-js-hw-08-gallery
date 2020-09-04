import pictures from '/gallery-items.js'; //images data

//page elements
const gallery = document.querySelector(".gallery")
const modal = document.querySelector(".lightbox")
const closeModalBtn = document.querySelector('button[data-action="close-modal"]')
const closeModalWindow = document.querySelector('.lightbox__overlay')
const modalImage =  document.querySelector('.lightbox__image')
const previewImage = document.querySelector("gallery__image")
//functions
const createGallery = (image, index, array) => {
    const nextElement = (index + 1) < array.length ? array[index + 1] : array[0]
    const $li = document.createElement('li')
    const $img = document.createElement('img')
    $img.classList.add("gallery__image")
    $img.src = image.preview
    $img.dataset.source = image.original
    $img.alt = image.description
    $img.dataset.number = index
    $img.dataset.totalNumber = array.length
    const $a = document.createElement('a')
    $a.dataset.original = image.original
    $a.classList.add("gallery__link")
    $a.href = image.original
    //append elements
    $li.append($a)
    gallery.append($li) 
    $a.append($img)
    
}

pictures.forEach(createGallery);

const openModal = (event) => {
    //убрать поведение по умолчанию
    event.preventDefault()
    // является ли елемент картинкой галереи
    if(event.target.className !== "gallery__image") {
        return
    }

    //открыть модал
    //make modal visible
    modal.classList.replace("lightbox", "lightbox.is-open")
    modalImage.dataset.number = event.target.dataset.number
    largeImageURL(event.target.dataset.source)


}

function updateSlider() {
    //задача - обновлять индекс и текущий элемент
    let currentIndex = parseInt(modalImage.dataset.number)
    let nextIndex = nextNumber(currentIndex);
    const prevIndex = prevNumber(currentIndex);
    //найти нужный еллемент по индексу
    const nextImageUrl = pictures[nextIndex].original
    console.log(nextIndex)
    modalImage.setAttribute('src', nextImageUrl)
    modalImage.dataset.number = nextIndex

}
document.addEventListener('keydown', updateSlider);





function largeImageURL(newUrl) {
    modalImage.src = newUrl
}

function prevNumber(current) {
    const prev = current - 1
    return  prev < 0 ? 0 : prev
}

function nextNumber(current, total = 8) {
    const next = current + 1
    return next > total ? 0 : next
}

// show element in slider
// const nextElementUrl  = (current, total) => {

//     function nextNumber() {
//         const next = current + 1
//         return next > total ? 0 : next
//     }

//     const img = document.querySelector(`img[data-current="${nextNumber()}"]`);
//     console.log(nextNumber())
//     return img.dataset.source

// }

const display = function (current,total) {

    function next(greet) {
        const next = current + 1
        console.log(greet)
    }
   
}





const closeModal = () => { 
    //make modal invisible
    modal.classList.replace("lightbox.is-open", "lightbox")
}


//integration

gallery.addEventListener("click", openModal)
closeModalBtn.addEventListener('click', closeModal)
closeModalWindow.addEventListener('click', closeModal)
