const productSelected = window.location.search;
const urlParams = new URLSearchParams(productSelected) 
const id = urlParams.get("id")
let itemPrice = 0
let imgUrl, altText, nameProduct

fetch(`http://localhost:3000/api/products/${id}`)
.then((data) => data.json())
.then((data) => {
    product(data)
})

function product(sofa){
    const {altTxt, colors, description, imageUrl, name, price} = sofa
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    nameProduct = name
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
    if (color == "" || quantity == 0){
        alert("Selectionnez une couleur et une quantité")
        return
    }
    const key = `${id}-${color}`
    const data ={
        id : id,
        name: nameProduct,
        color: color,
        quantity: Number(quantity),
        imageUrl: imgUrl,
        altTxt: altText,
    }
    localStorage.setItem(key, JSON.stringify(data))
    window.location.href = "cart.html"
})

 