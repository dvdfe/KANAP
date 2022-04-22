const cart = []


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
/*     deleteQuantitySettings(settings)
 */    
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
    input.value = item.value
    settings.appendChild(input)

    return quantity
    
}

/* function deleteQuantitySettings(item){
    const deleteItem = document.createElement('div')
    deleteItem.classList.add('cart__item__content__settings__delete')
    const p = document.createElement('p')
    p.classList.add('deleteItem')
    p.textContent('Supprimer')

    return deleteItem
}
 */

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

