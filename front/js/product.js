const productSelected = window.location.search;
const urlParams = new URLSearchParams(productSelected) 
const id = urlParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
.then((data) => data.json())
.then((data) => {
    product(data)
})

function product(sofa){
    const {altTxt, colors, description, imageUrl, name, price, _id} = sofa
    makeImage(imageUrl,altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)

}

function makeImage(imageUrl,altTxt){
    const image = document.createElement('img')
    image.src = imageUrl
    image.altTxt = altTxt
    const parent = document.querySelector('.item__img')
    parent.appendChild(image)
    return image
}

function makeTitle(name){
    document.querySelector('#title').textContent = name  
}

function makePrice(price){
    document.querySelector('#price').textContent = price
}

function makeDescription(description){
    document.querySelector('#description').textContent = description
}