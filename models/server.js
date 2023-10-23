import express from "express";
import cors from "cors";
import {router} from '../routes/usuarios.js';
import { dbConnection } from "../database/config.js";

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        // Conectar a base de datos
        this.conectarDB();

        // MIDDLEWARES
        this.middlewares();

        // RUTAS DE MI APLICACION
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        // CORS
        this.app.use(cors());

        // LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        
        this.app.use(this.usuariosPath, router);
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

export {
    Server
}