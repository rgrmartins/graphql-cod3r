//Como configurei o banco (kinexfile) na pasta config no arquivo db tenho que importar
const db = require('../config/db')

// const novoPerfil = {
//     nome: 'visitante',
//     rotulo: 'Visitante'
// }

//esse finally é só a titulo de desenvolvimento e testes, pq o knex tem pool de conexão controlado

// db('perfis').insert(novoPerfil)
//     .then(res => console.log(res))
//     .catch(err => console.log(err.sqlMessage))
//     .finally(() => db.destroy())


//outra forma de fazer o insert no banco
const perfilSU = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuário'
}

db.insert(perfilSU)
    .into('perfis')
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())
