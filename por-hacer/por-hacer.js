const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo guardar la base de datos...');
        else
            console.log('Base de datos guardada...');
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (description) => {

    cargarDB();

    let porHacer = {
        description,
        complete: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();

    return listadoPorHacer;
}

const actualizar = (description, complete = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.description === description);
    if (index >= 0) {
        listadoPorHacer[index].complete = complete;

        guardarDB();

        return true;
    } else {
        return false;
    }
}

const borrar = (description) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.description === description);
    if (index >= 0) {
        listadoPorHacer = listadoPorHacer.filter(tarea => tarea.description !== description);
        guardarDB();

        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}