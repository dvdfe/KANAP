fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
  
  function addProducts(data) {
    
    const imageUrl= data[0].imageUrl
    const link = document.createElement("a")
    link.href = "http://localhost:3000/images/kanap01.jpeg"
    link.text = "Photo d'un canapé bleu, deux places"
    const items = document.querySelector("#items")
    items.appendChild(link)
  } 
  