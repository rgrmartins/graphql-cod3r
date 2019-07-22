const db = require('../config/db')

// Para excluir é necessário primeiro deletar todos os relacionamentos dele para ai deleta-lo, uma outra prática é usar o softdelete(flag na tabela)

//excluir por id (filtrando primeiro e depois excluindo)
db('usuarios').where({ id: 1 })
        .delete()
        .then(res => console.log(res)) //no caso do delete ele retorna a quantidade de itens deletado e não o id deletado
        .finally(() => db.destroy())

//Excluir tudo (limpar a tabela)
db('perfis')
    .delete()
    .then(res => console.log(res)) //no caso do delete ele retorna a quantidade de itens deletado e não o id deletado
    .finally(() => db.destroy())