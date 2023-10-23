import mongoose from "mongoose";

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN)
         console.log('Base de datos online');    
  
     } catch (error) {
        console.log('Base de datos online'); 
         throw new Error('Error en la base de datos')
     } 
    
}


export { dbConnection }