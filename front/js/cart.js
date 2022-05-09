const cart = []
const orderButton = document.querySelector("#order")
orderButton.addEventListener('click', (e) => orderForm(e))

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
      articles()
      for (const item of cart){
          const product = data.find(indata => item.id == indata._id)
          item.price = product.price
      }
      cart.forEach((item) => displayItem(item))
    console.log(cart)}
  )


function articles(){
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
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
        const totalQuantity = item.quantity
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
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
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
    displayTotalPrice()
    displayTotalQuantity()
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
    if (validateForm()) return
    if (validateEmail()) return
    if (validateFirstName()) return
    if (validateLastName()) return



    const body = makeBody()
    fetch ("http://localhost:3000/api/products/order", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
        
    })
    .then((res) => res.json())
    .then((data) => {
        const orderId = data.orderId
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
    }) 
    .catch((err) => console.log(err))
}

function validateForm(){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    for (const input of inputs){
    if (input.value.trim().length === 0){
            alert ("Remplissez tous les champs")
            return true
        }
    }
    return false
  
}

function validateEmail(){
    const email = document.querySelector("#email").value
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (regex.test(email) === false){
        alert ("Adresse email non valide")
        return true
    }
    return false
}

function validateFirstName(){
    const firstName = document.querySelector("#firstName").value
    const regex = /^[^0-9]+$/gm
    if (regex.test(firstName) === false){
        alert ("Prénom invalide")
        return true
    }
    return false
}

function validateLastName(){
    const lastName = document.querySelector("#lastName").value
    const regex = /^[^0-9]+$/gm
    if (regex.test(lastName) === false){
        alert ("Nom invalide")
        return true
    }
    return false
}


function makeBody(){
    const form = document.querySelector('.cart__order__form')
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
   
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
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


