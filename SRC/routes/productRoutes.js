// // Archivo que contendrá la definición de las rutas CRUD para los productos.
// Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct, 
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");




router.get("/", showProducts);

router.get("/dashboard/new", showNewProduct);
router.get("/dashboard/:productId", showProductById);
router.get("/dashboard",showProducts);
router.post("/dashboard",createProduct);
router.get("/dashboard/:productId/edit",showEditProduct);
router.put("/dashboard/:productId", updateProduct);
router.delete("/dashboard/:productId/delete", deleteProduct);
router.get("/products", showProducts);
router.get("/products/:productId",showProductById);



module.exports = router;




/////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// POST /dashboard: Crea un nuevo producto.
router.post("/dashboard", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).send(newProduct);
  } catch (error) {
    console.log(Error);
    res.status(500).send("server error");
  }
});
*/
/*

// GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos
// los artículos que se hayan subido.Si clickamos en uno de ellos nos llevará a su página para poder
// actualizarlo o eliminarlo.

router.get('/dashboard', async (req, res) => {
    try {
      const products = await Product.find();
      let productsLinks = '';
      products.forEach(product => {
        productsLinks += `
            <li>
                <a href="/dashboard/${product._id}">${product.name}</a>
            </li>
        `;
      });
      res.status(200).send(`
        <h1>Products</h1>
        <ul>
          ${productsLinks}
        </ul>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "error get product"});
    }
});
*/

// GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
/*
router.get("/dashboard/new", async (req, res) => {
  try {
    res.send(`
  <h1>New Always</h1>
<label for="name">Nombre:</label>
                <input type="text" id="name" name="Nombre" required>
                 <label for="description">Descripcion:</label>
                <textarea id="description" name="Descripcion" required></textarea>
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
                <button class="proof" type="submit">Crear</button>
            </form>
`);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});*/

/*

// GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send("Product not found");
  }
});
*/

/*
// GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(`
        <h1>Product Edit</h1>
  <form action="/dashboard/${req.params.productId}/edit" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" value="${product.Nombre}">
    <label for="descripcion">Descripcion:</label>
    <input type="text" id="descripcion" name="descripcion" value="${product.Descripcion}">
    <label for="categoria">Categora:</label>
    <input type="text" id="categoria" name="categoria" value= ${product.Categoria}>
    <label for="talla">Talla:</label>
    <input type="text" id="talla" name="talla" value=${product.Talla}>
    <label for="precio">Precio:</label>
    <input type="number" name="precio" value= ${product.Precio}>
    <input type="submit" value="Submit">
  </form>
        `);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

*/

/*
// PUT /dashboard/:productId: Actualiza un producto.
router.put("/dashboard/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!updateProduct) {
      return res.status(404).send("product not found");
    }
    res.json(updateProduct);
  } catch (error) {
    console.error(error);
    res.status(404).send("error updating");
  }
});

*/

/*
// // DELETE /dashboard/:productId/delete: Elimina un producto.!!!!deleteProduct
// router.delete("/dashboard/:productId/delete", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const deleteProduct = await Product.findByIdAndDelete(productId);
//     if (!deleteProduct) {
//       return res.status(404).json({ message: "Id not found" });
//     }
//     res.status(200).send({ message: "Id deleted!" });
//   } catch (error) {
//     console.log(error);
//     res.send(500).send("Error deleting id");
//   }
// });
*/

/*
//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", async (req, res) => {
  try {
    const newProduct = await Product.find();
    res.json(newProduct);
  } catch (Error) {
    console.log(Error);
    res.send(500).send("server on");
  }
});
*/

/*
// GET /products/:productId: Devuelve el detalle de un producto.
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Item not found" });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("server on");
  }
});
*/
