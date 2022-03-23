fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    return addProducts(data) 
  })

function addProducts(data) {
    const id= data[0]._id
    const imageUrl = data[0].imageUrl
    const altTxt = data[0].altTxt
    const name = data[0].name
    const description = data[0].description
    
    const image = makeImage(imageUrl,altTxt)
    const link = makeLink(id)
    const article = makeArticle() 
    const h3 = makeH3(name)
    const p = makeParagraph(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(link, article)
  } 
  
function makeLink(id){
    const link = document.createElement("a")
    link.href = "./product.html?id=" + id
    return link
  }

function appendChildren(link, article) {
    const items = document.querySelector("#items")
    items.appendChild(link)
    link.appendChild(article)
  }

function makeImage(imageUrl, altTxt){
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  return image
}

function makeArticle(){
  const article = document.createElement("article")
  return article
}

function makeH3(name){
  const h3 = document.createElement("h3")
  h3.textContent = name
  h3.classList.add("productName")
  return h3
}

function makeParagraph(description){
  const p = document.createElement("p")
  p.textContent = description
  p.classList.add("productDescription")
  return p
}