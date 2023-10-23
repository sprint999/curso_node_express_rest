import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req, res = response) => {

    //const {q, nombre, apikey, page = 'dd', limit} = req.query;
    const { limite = 5, desde=0} = req.query;

    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async (req, res = response) => {
    
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // validar contra BD

    if (password) {
        // encriptar la contraseña.
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuariosPost = async (req, res = response) => {    

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    /*const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya està registrado.'
        })
    }*/ 

    // encriptar la contraseña.
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    // Guardar en BD.
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosDelete = async (req, res = response) => {    
    
    const {id} = req.params;

    // FISICAMENTE SE BORRA
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        id,
        usuario
    });
};

const usuariosPath = (req, res = response) => {    
    res.json({
        msg: 'path API controlador'
    });
};

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
}