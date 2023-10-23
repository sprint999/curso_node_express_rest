import { Router }  from "express";
import { check } from 'express-validator';
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPath } from "../controllers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {esRoleValido,emailExiste,existeUsuarioPorId} from "../helpers/db-validator.js";

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [

    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos


], usuariosPut);

router.post('/',[
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('password','El password debe ser de 6 letras').isLength({min: 6}),        
        //check('correo','Correo invalido').isEmail(),
        check('correo').custom(emailExiste),
        //check('rol','No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
        check('rol').custom(esRoleValido),
        validarCampos
    ], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPath);

export {
    router
}