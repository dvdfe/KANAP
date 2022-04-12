const productSelected = window.location.search;
const urlParams = new URLSearchParams(productSelected) 
const id = urlParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
.then((data) => data.json())
.then((data) => {
    console.log(data)
})