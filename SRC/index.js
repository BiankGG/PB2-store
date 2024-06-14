// Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado
//  para servir archivos estáticos y para leer el body de las peticiones de formularios.

const express = require ('express');
const app = express()
const {dbStore} = require ('./config/db')
const productRoutes = require('./routes/productRoutes')

//config PORT variable entorno para desplegar
const dotenv = require('dotenv');
const PORT = process.env.PORT||3000;
dotenv.config();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

dbStore()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));


//configuro ruta productRoutes EX.
app.use('/', productRoutes)



 
app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`)
});

