const db = require('../../config/db')

module.exports = {
    perfis() {
        return db('perfis')
    },
    perfil(_, { filtro }) {
        //se estiver vazio o filtro
        if (!filtro) return null
        const { id, nome } = filtro
        if (id) {
            //consultando por id
            return db('perfis').where({ id }).first()
        } else if (nome) {
            //consultando por nome
            return db('perfis').where({ nome }).first()
        } else {
            return null
        }
    }
}