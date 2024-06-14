// // Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos.
// Devolverá las respuestas en formato HTML.

//preguntar en tutoria si puedo hacer una funcion mas donde se busca el producto por categoria ??

const Product = require("../models/Product");

// showProducts: Devuelve la vista con todos los productos.

const showProducts = async (req, res) => {
  try {
    const dashboard = req.url.includes("/dashboard");
    const { categoria: categoria } = req.query;
    let products;
    if (categoria) {
      products = await Product.find({ Categoria: categoria }); //solicitud consulta GET ?categoria=/etc..
      // console.log("categoria", products);
    } else {
      products = await Product.find();
      // console.log("all Products", products);
    }
    const productCards = getProductCards(products, dashboard);
    // console.log("html", productCards);
    const html = baseHtml(productCards, dashboard);
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
};

// showProductById: Devuelve la vista con el detalle de un producto.(arreglado)
const showProductById = async (req, res) => {
  try {
    const dashboard = req.url.includes("/dashboard");
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "product not found" });
    }
    const ProductInfo = productInfo(product, dashboard); //info product
    const html = baseHtml(ProductInfo, dashboard);
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error getting product" });
  }
};

// createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle
//  del producto o a la vista de todos los productos del dashboard.

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.redirect(`/dashboard/${newProduct._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de
// detalle del producto o a la vista de todos los productos del dashboard.

const updateProduct = async (req, res) => {
  try {
    console.log("reqParams:", req.params);
    console.log("reqBody:", req.body);

    const { productId } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId }, ///findOne an object
      req.body,
      {
        new: true,
      }
    );
    console.log("updated:", updatedProduct);

    if (!updatedProduct) {
      return res.status(404).send("product not found");
    }
    res.redirect(`/dashboard/${productId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// showEditProduct: Devuelve la vista con el formulario para editar un producto.(arreglado)

const showEditProduct = async (req, res) => {
  
  try {
    const dashboard = req.url.includes("/dashboard");
    const product = await Product.findById(req.params.productId);
    // console.log("Product found:", product);
    if (!product) {
      console.log("Product not found");
      return res.status(404).send("product not found");
    }
    const Formulario = formulario(product);
    const html = baseHtml(Formulario, dashboard);
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
const showNewProduct = (req, res) => {
  const dashboard = req.url.includes("/dashboard");
  // console.log("dashboard:", dashboard);
  const form = NewProductForm(); //html del formulario de crear
  // console.log("form:", form);
  const html = baseHtml(form, dashboard);
  res.send(html);
};

// deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista
//  de todos los productos del dashboard.

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("ID not found");
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

///////salga por categoria /dashboard  ????¿¿¿¿¿
const PCategoria = async (req, res) => {
  const { Categoria } = req.query;
  try {

    if (!Categoria) {
      return res.status(404).send("not found");
    }
    const categoria = await Product.find({ Categoria: categoria });
    console.log("cual?", categoria);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const  categoriasFormulario = (dashboard)=> {
  return `
    <div class="categories">
      <a href="/dashboard?categoria=Zapatos">Zapatos</a>
      <a href="/dashboard?categoria=Camisetas">Camisetas</a>
      <a href="/dashboard?categoria=Pantalones">Pantalones</a>
      <a href="/dashboard?categoria=Accesorios">Accesorios</a>
    </div>
  `;
}

///////////////////////////////////////////////////

const baseHtml = (restInformacion, dashboard) => `
  <!DOCTYPE html>
  <html>
    <head>
        <title>My Freak Store</title>
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body>
      ${getNavBar(dashboard)}
       <main>
          ${restInformacion}
       </main>
    </body>
  </html>
`;

const productInfo = (product, dashboard) => {
  if (dashboard) {
    return `
          <div class="Pinfo">
              <h2>${product.Nombre}</h2>
              <img src="${product.Imagen}" alt="${product.Nombre}">
              <div class= "background">
              <p>${product.Descripcion}</p>
              <p>${product.Precio}€</p>
              <p>Categoría: ${product.Categoria}</p>
              <p>Talla: ${product.Talla}</p>
              </div>
              <form method="POST" action="/dashboard/${product._id}/delete?_method=DELETE">
                  <button type="submit">Borrar</button>
              </form>
              <form method="GET" action="/dashboard/${product._id}/edit">
                  <button type="submit">Editar</button>
              </form>
               <a href="/products/${product._id}" class="enlace">Look at new Product!</a>
          </div>
      `;
  } else {
    return `
          <div class="Pinfo2">
              <h2>${product.Nombre}</h2>
              <img src="${product.Imagen}" alt="${product.Nombre}">
              <p>${product.Descripcion}</p>
              <p>${product.Precio}€</p>
              <p>Categoría: ${product.Categoria}</p>
              <p>Talla: ${product.Talla}</p>
               <form method="GET" action="/dashboard/${product._id}/edit">
                  <button type="submit">Editar</button>
              </form>
              
               <a href="/products" >GET BACK</a>
          </div>
      `;
  }
};

function getNavBar(dashboard) {
  if (dashboard) {
    return `
      <nav class="navbar">
            <a href="/dashboard">Productos</a>
            <a href="/dashboard?categoria=Camisetas">Camisetas</a>
            <a href="/dashboard?categoria=Pantalones">Pantalones</a>
            <a href="/dashboard?categoria=Zapatos">Zapatos</a>
            <a href="/dashboard?categoria=Accesorios">Accesorios</a>
            <a href="/dashboard/new">CREATE</a>
        </nav>
    `;
  } else {
    return `
      <nav class="navbar">
        <a href="/products">Productos</a>
        <a href="/products?categoria=Camisetas">Camisetas</a>
        <a href="/products?categoria=Pantalones">Pantalones</a>
        <a href="/products?categoria=Zapatos">Zapatos</a>
        <a href="/products?categoria=Accesorios">Accesorios</a>
         <a href="/dashboard/new">CREATE</a>
      </nav>
    `;
  }
}

function getProductCards(Products) {
  let html = "";
  for (let Product of Products) {
    html += `
      <div class="ProductCard">
        <img src="${Product.Imagen}" alt="${Product.Nombre}">
        <div class="infoCard">
          <h2>${Product.Nombre}</h2>
          <p>Descripcion: ${Product.Descripcion}</p>
          <p>Categoria: ${Product.Categoria}</p>
          <p>Talla: ${Product.Talla}</p>
          <p>Precio: $${Product.Precio}</p>
          <a href="/products/${Product._id}">LooK at IT!</a>
        </div>
      </div>
  `;
  }
  return html;
}
//usar method-override para usar PUT
const formulario = (product) => `
<div class= "editPro">
<h1>Edit Product</h1>
<form action="/dashboard/${product._id}?_method=PUT" method="POST">
    <label for="Nombre">Nombre:</label>
    <input type="text" id="Nombre" name="Nombre" value="${product.Nombre}">
    <label for="Descripcion">Descripcion:</label>
    <input type="text" id="Descripcion" name="Descripcion" value="${product.Descripcion}">
    <label for="Categoria">Categoria:</label>
    <input type="text" id="Categoria" name="Categoria" value="${product.Categoria}">
    <label for="Talla">Talla:</label>
    <input type="text" id="talla" name="Talla" value="${product.Talla}">
    <label for="Precio">Precio:</label>
    <input type="Number" id="Precio" name="Precio" value="${product.Precio}">
     <label for="Imagen">Imagen:</label>
    <input type="text" id="Imagen" name="Imagen" value="${product.Imagen}">
    <input type="hidden" name="_method" value="PUT">
    <input type="submit" value="Submit">
</form>
</div>
`;

const NewProductForm = () => `
        <div class="form-create">
            <h1>Create Product</h1>
            <form action="/dashboard" method="POST">
                <label for="Nombre">Nombre:</label>
                <input type="text" id="Nombre" name="Nombre" required>
                 <label for="Description">Descripcion:</label>
                <textarea id="Description" name="Descripcion" required></textarea>
                <label for="Precio">Precio:</label>
                <input type="number" id="Precio" name="Precio" min="5" max="100" required>
                <label for="Imagen">Copy Imagen address:</label>
                <input type="text" id="Imagen" name="Imagen" required>
                <label for="Categoria">Categoria:</label>
                <select id="Categoria" name="Categoria" required>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Zapatos">Zapatos</option>
                    <option value="Accesorios">Accesorios</option>
                </select>
                <label for="Talla">Talla:</label>
                <select id="Talla" name="Talla" required>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <button class="Submit" type="submit">Crear</button>
            </form>
        </div>
`;

module.exports = {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  showEditProduct,
  createProduct,
  showNewProduct,
 
};
