
My Freak Store( pb2-store)


## Tabla de Contenido

- Descripcion

- Prerequisitos

- Dependencias

- Dependencias de desarollo

- Scripts

- Entorno

- Instalación

- Despligue

## INDICE
  - Realizar estructura de archivos
  - Crear base de datos
  - Crear un servidor
  - Crear modelos 
  - Crear rutas
  - Crear rutas para controladores
  - Realizar despliegue en Render


## Descripción

SE ha creado pb2-store, es un aplicacion para montar una tienda de ropa con un catalogo de productos, 
Zapatos, Camisetas,Pantalones y Accesorios. Los productos se almacenas en Mongo DB y atlas.
 Se pueden agregar, editar y borrar segun quieras.

## Prerrequisitos
  
- HTML y CSS: Para estructura y estilos 

- Git y GitHub: Repositorio remoto 

- node.js: Reiniciar automaticamente el servidor cuando hay cambios en el codigo

- Npm: Gestionar las dependencias y scripts de tu proyecto.

- MongoDm: Base de datos

- Mongoose: (Object-Document Mapping) para MongoDB

- dotenv: Gestion de variables de entorno

- Config: Manejar configuraciones 

- Express: Manejar rutas

- Method: Override- Middleware

- Pug: Motor de plantillas HTML en Express

- Render: Desplegar el proyecto


## Dependencias

    "config": "^3.3.11",

    "dotenv": "^16.4.5",

    "express": "4.19.2",

    "method-override": "^3.0.0",

    "mongodb": "^6.7.0",

    "mongoose": "^8.4.1",

    "pug": "^3.0.3",


## Dependencias de Desarrollo

"nodemon": "^3.1.3"

##   Scripts

npm run dev: Inicia la aplicación en modo desarrollo con nodemon.

npm start: Inicia la aplicación en modo producción.


## Entorno

- Variable de entorno en archivo .env


MONGO_URI= mongodb+srv://biancagriffin:BiancaGriffin17@store-pb.n2xto9h.mongodb.net/Store-Proyect

PORT: El puerto en el que la aplicación escuchará (por defecto: 3000).

## Instalación

git clone https://github.com/tu-usuario/pb2-store.git

Instalar dependencias: npm install

## Despliegue

- En Render, hay que crear una cuenta.
- Conectar tu repositori GitHub a Render
- Crear un nuevo servicio en render y selecionar el repositorio. 
- Configura las variables de entorno.







