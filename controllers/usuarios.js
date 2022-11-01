import { response } from "express";

const usuariosGet = (req, res = response) => {

    const {q, nombre, apikey, page = 'dd', limit} = req.query;

    res.json({
        msg: 'get API controlador',
        q, nombre, apikey, page, limit
    });
};

const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;

    res.json({
        msg: 'put API controlador',
        id
    });
};

const usuariosPost = (req, res = response) => {    
    
    const {nombre, edad} = req.body;
    
    res.json({
        msg: 'post API controlador',
        nombre, edad
    });
};

const usuariosDelete = (req, res = response) => {    
    res.json({
        msg: 'delete API controlador'
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