const db = require('../config/db')

//Uma forma de fazer select (Aqui traz tudo)
// db('perfis')
//     .map(p => p.nome)
//     .then(nomes => console.log(nomes))
//     .finally(() => db.destroy())


//outra forma de fazer select
// db('perfis').select('nome', 'id')
//     .then(res => console.log(res))
//     .finally(() => db.destroy())


//outra forma de fazer select
// db.select('nome', 'id')
//     .from('perfis')
//     .limit(4) //limitando a 4 registros na volta
//     .offset(2) //deslocamento para pular os 2 primeiros
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

//filtrar nas tabelas
db('perfis')
    //.where('id', '=', 2) também funciona
    //.where('nome', 'like', '%min%') também funciona
    //.where({ id: 2 }) //forma de filtrar
    //.whereNot({ id: 2 }) //forma de excluir, todos menos esse
    //.first() // forma de retornar um objeto e não um array com um unico objeto
    .whereIn('id', [1,2,3]) //array de where
    .then(res => console.log(res))
    .finally(() => db.destroy())