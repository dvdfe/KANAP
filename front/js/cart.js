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
    const image = makeImage(item)

}

function makeArticle(item){
    const article = document.createElement('article')
    article.classList.add('cart__item')
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImage(item){
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    return image
}