// // Archivo que contendrá la configuración de la base de datos.
//  Deberá conectarse a la base de datos de mongo en Atlas.

const mongoose = require("mongoose");
require("dotenv").config();

const dbStore = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
    throw new Error("Error conecting to DB");
  }
};

module.exports = {
  dbStore,
};
