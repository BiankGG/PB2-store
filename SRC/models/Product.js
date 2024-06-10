// Archivo que contendrá la definición del esquema del producto utilizando Mongoose.

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Nombre:{type: String, require:true},
    Descripcion: { type: String, required: true },
    Imagen: { type: String },
    Categoria: {type: String, enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],require:true},
    Talla: {type: String, enum: ["XS", "S", "M", "L", "XL"],require:true},
    Precio: { type: Number, require: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
