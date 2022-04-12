fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {addProducts(data)})

function addProducts(data) {

  data.forEach((sofa) => {
    const { _id, imageUrl, altTxt, name, description } = sofa;

    const image = makeImage(imageUrl, altTxt);
    const link = makeLink(_id);
    const article = document.createElement("article");
    const h3 = makeH3(name);
    const p = makeParagraph(description);
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);
    appendArticleToLink(link, article);
  });
}

function makeLink(id) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  return link;
}

function appendArticleToLink(link, article) {
  const items = document.querySelector("#items");
  items.appendChild(link);
  link.appendChild(article);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}


function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

function makeParagraph(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
