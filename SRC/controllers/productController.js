// // Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos.
// Devolverá las respuestas en formato HTML.


//preguntar en tutoria si puedo hacer una funcion mas donde se busca el producto por categoria ??

const Product = require("../models/Product");


const baseHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Freak Store</title>
    <link rel="stylesheet" href="/static/styles.css">
</head>
<body>

`;

const endHtml = `
</body>
</html>
`;

function getNavBar() {
  return `
  <nav>
      <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/products">Productos</a></li>
          <li><a href="/products">Camisetas</a></li>
          <li><a href="/products">Pantalones</a></li>
          <li><a href="/products">Zapatos</a></li>
      </ul>
  </nav>
  `;
};

function formulario(product) {
  return `
<h1>Product Edit</h1>
<form action="/dashboard/${req.params.productId}/edit" method="post">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" value="${product.Nombre}">
  <label for="descripcion">Descripcion:</label>
  <input type="text" id="nombre" name="nombre" value="${product.Descripcion}">
  <label for="categoria">Categora:</label>
  <input type="text" id="categoria" name="categoria" value=" ${product.Categoria}">
  <label for="talla">Talla:</label>
  <input type="text" id="talla" name="talla" value="${product.Talla}">
  <label for="precio">Precio:</label>
  <input type="number" name="precio" value="${product.Precio}">
  <input type="submit" value="Submit">
</form>
`
}


function getProductCards(Products) {
  let html = "";
  for (let Product of Products) {
    html += `
    <div class="ProductCard">
    <img src="${Product.Imagen}" alt="${Product.Nombre}">
    <h2>${Product.Nombre}</h2>
    <p>Descripción:${Product.Descripcion}</p>
    <p>Categoría: ${Product.Categoria}</p>
    <p>Talla:${Product.Talla}</p>
    <p>Precio:$${Product.Precio}</p>
  </div>
  `;
  }
  return html;
}


// showProducts: Devuelve la vista con todos los productos.
const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products);
  const html = baseHtml + getNavBar() + productCards + endHtml;
  res.send(html);
};


// showProductById: Devuelve la vista con el detalle de un producto.
const showProductById = async(req,res)=>{
const products = await Product.findById(req.params.id)
const productCards= getProductCards(products);
const html=  baseHtml + getNavBar() + productCards + endHtml;
res.send(html);

}

//++++++++++++
// createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle
//  del producto o a la vista de todos los productos del dashboard.

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};






// updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de
// detalle del producto o a la vista de todos los productos del dashboard.

const updateProduct = async (req, res) => {
  try {
    const { id} = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect(`/dashboard/new${updatedProduct._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};


// showEditProduct: Devuelve la vista con el formulario para editar un producto.

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send(" not found");
    }
    const Formulario = formulario(product);
    const html = baseHtml + getNavBar() + Formulario + endHtml;
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};


// showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
const ShowNewProduct = async (req, res) => {

};

// const showProductById = async(req,res)=>{
//   const products = await Product.findById(req.params.id)
//   const productCards= getProductCards(products);
//   const html=  baseHtml + getNavBar() + productCards + endHtml;
//   res.send(html);








// deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista
//  de todos los productos del dashboard.

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send("not deleted");
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};


module.exports = {
  showProducts,
  showProductById,
  updateProduct,
  deleteProduct,
  showEditProduct,
  createProduct
};
