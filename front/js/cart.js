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
    displayArticle(article)
    const div = makeImageDiv(item)
    const settings = makeSettings(item)
    article.appendChild(div)
    console.log(article);

    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    cardItemContent.appendChild(settings)
}

function makeCartContent(item){
    const div = document.createElement('div')
    div.classList.add('cart__item__content')


    const description = document.createElement('div')
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement('h2')
    h2.textContent = item.name

    const p = document.createElement('p')
    p.textContent = item.color

    const price = document.createElement('p')
    price.textContent = item.price + "€"

    description.appendChild(h2, p, price)
    description.appendChild(p)
    description.appendChild(price)
    div.appendChild(description)
    

    return div
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

function makeSettings(item){
    const settings = document.createElement('div')
    settings.classList.add("cart__item__content__settings")
    return settings
}

function addQuantitySettings(){
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
    input.value = '42'
}

