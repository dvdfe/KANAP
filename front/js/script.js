fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
  
  function addProducts(data) {
    const imageUrl= data[0].imageUrl
    const link = makeLink(imageUrl)
    appendChildren(link)
  } 
  

  function makeLink(imageUrl){
    const link = document.createElement("a")
    link.href = imageUrl
    return link
  }

  function appendChildren(link) {
    const items = document.querySelector("#items")
    items.appendChild(link)
  }