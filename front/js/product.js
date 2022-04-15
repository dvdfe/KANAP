const productSelected = window.location.search;
const urlParams = new URLSearchParams(productSelected) 
const id = urlParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
.then((data) => data.json())
.then((data) => {
    product(data)
    console.log(data)
})

function product(sofa){
    const {altTxt, colors, description, imageUrl, name, price} = sofa
    makeImage(imageUrl,altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)

}

function makeImage(imageUrl,altTxt){
    const image = document.createElement('img')
    image.src = imageUrl
    image.altTxt = altTxt
    const parent = document.querySelector('.item__img')
    parent.appendChild(image)
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


function makeColors(colors){
    const select = document.querySelector('#colors')
    colors.forEach ((color) => {
        const option = document.createElement('option')
        option.value = color
        option.textContent = color
        select.appendChild(option)
    });

}

const btn = document.querySelector('#addToCart')
btn.addEventListener('click', () =>{
    const color = document.querySelector('#colors').value
    const quantity = document.querySelector('#quantity').value
    if (color == null || quantity == null){
        alert("Selectionnez une couleur et une quantité")
    }
})

