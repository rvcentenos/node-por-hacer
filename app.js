// const argv = require('yargs');
const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];
switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.description);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        console.log('============ Por Hacer ============'.green);
        for (let tarea of listado) {
            console.log('* Tarea  : ', tarea.description);
            console.log('  Estado : ', colors.red.bold(tarea.complete));
        }
        console.log('==================================='.green);

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.description, argv.complete);
        console.log(actualizado);

        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.description);
        console.log(borrado);

        break;
    default:
        console.log("Comando no reconocido");
}