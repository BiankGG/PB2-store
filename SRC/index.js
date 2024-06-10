// Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado
//  para servir archivos estáticos y para leer el body de las peticiones de formularios.

const express = require ('express');
const app = express()
const {dbStore} = require ('./config/db')
const productRoutes = require('./routes/productRoutes')
const { showProducts, showProductById, updateProduct, deleteProduct,showEditProduct,createProduct } = require('./controllers/productController');

dbStore()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));



//configuro ruta productRoutes EX.
app.use('/', productRoutes)



//configuro rutas express de ProductController 
app.get('/', showProducts);
// app.get('/:id', showProductById);
// app.put('/products/:id', updateProduct);
// app.delete('/products/:id', deleteProduct);
// app.get('/dashboard/:productId/edit',showEditProduct);
// app.post('/dashboard/new', ShowNewProduct);


 
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
});

