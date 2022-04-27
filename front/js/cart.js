const cart = []
const orderButton = document.querySelector("#order")
orderButton.addEventListener('click', (e) => orderForm(e))

articles()
cart.forEach((item) => displayItem(item))

function articles(){
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
    console.log(cart)
}


function displayItem(item){
    const article = makeArticle(item)
    const div = makeImageDiv(item)
    article.appendChild(div)
    
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity(item)
    displayTotalPrice(item)
}

function displayTotalQuantity(item){
    let total = 0;
    const totalQuantity = document.querySelector('#totalQuantity')
    cart.forEach((item) =>{
        const totalQuantity = item * item.quantity
        total = total + totalQuantity
    }) 
    totalQuantity.textContent = total
}

function displayTotalPrice(item){
    let total = 0;
    const totalPrice = document.querySelector('#totalPrice')
    cart.forEach((item) =>{
        const totalPrice = item.price * item.quantity
        total = total + totalPrice
    }) 
    totalPrice.textContent = total
}


function makeCartContent(item){
    const cardItemContent = document.createElement('div')
    cardItemContent.classList.add('cart__item__content')
    
    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}


function makeSettings(item){
    const settings = document.createElement('div')
    settings.classList.add("cart__item__content__settings")
    
    addQuantitySettings(settings, item)
    deleteQuantitySettings(settings, item)
    
    return settings
}

function addQuantitySettings(settings, item){
    const quantity = document.createElement('div')
    quantity.classList.add('cart__item__content__settings__quantity')
    const p = document.createElement('p')
    p.textContent = 'Qté :'
    quantity.appendChild(p)
    const input = document.createElement('input')
    input.type = 'number'
    input.classList.add('itemQuantity')
    input.name = ('itemQuantity')
    input.min = '1'
    input.max = '100'
    input.value = item.quantity
    input.addEventListener('input', () => updateQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)

    return quantity
    
}

function updateQuantity(id, newValue, item){
    const itemToUpdate = cart.find(item => item.id === id)
    console.log(itemToUpdate)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    console.log(cart);
    displayTotalPrice()
    displayTotalQuantity()

    newLocalStorage(item)

}


function newLocalStorage(item){
    const newData = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, newData)
}


function deleteQuantitySettings(settings, item){
    const div = document.createElement('div')
    div.classList.add('cart__item__content__settings__delete')
    div.addEventListener('click', ()=> deleteItem(item))
    const p = document.createElement('p')
    p.classList.add('deleteItem')
    p.textContent = 'Supprimer'
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item){
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    deleteItemLocalStorage(item)
    deleteItemPage(item)

}

function deleteItemPage(item){
    const itemToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    itemToDelete.remove()

}

function deleteItemLocalStorage(item){
    const key = `${item.id}-${item.color}`
    console.log(key)
    localStorage.removeItem(key)
}


function makeDescription(item){
    const description = document.createElement('div')
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement('h2')
    h2.textContent = item.name
    
    const p = document.createElement('p')
    p.textContent = item.color
    
    const price = document.createElement('p')
    price.textContent = item.price + "€"
    
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(price)
    return description
}


function displayArticle(article){
    document.querySelector('#cart__items').appendChild(article)
}

function makeArticle(item){
    const article = document.createElement('article')
    article.classList.add('cart__item')
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item){
    const div = document.createElement('div')
    div.classList.add('cart__item__img')
    
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

//---------------------------------------------------------------------------ORDER

function orderForm(e){
    e.preventDefault()
    if (cart.length === 0){
         alert ("Votre panier est vide")
         return
    }

    validateForm()

    const body = makeBody()
    fetch ("https://localhost:3000/api/products/order", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
        
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    console.log(form.elements.firstName.value);
}

function validateForm(){


}


function makeBody(){
    const form = document.querySelector('.cart__order__form')
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lasttName.value
    const adress = form.elements.adress.value
    const city = form.elements.city.value
    const email = form.elements.email.value
   
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            adress: adress,
            city: city,
            email: email,
        },
        products: idLocalStorage()
    }
    console.log(body)
    return body
}

function idLocalStorage(){
    const products = localStorage.length
    const ids = []
    for (let i = 0 ; i < products; i ++){
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}