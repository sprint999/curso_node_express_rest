import { Router } from "express";
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPath } from "../controllers/usuarios.js";


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPath);

export {
    router
}