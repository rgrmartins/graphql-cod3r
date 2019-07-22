const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
           const idsPerfis = []
           if (dados.perfis){
               for(perfilFiltro of dados.perfis){
                   const perfil = await obterPerfil(_, {
                       filtro: { ...perfilFiltro }
                   })
                   if (perfil) idsPerfis.push(perfil.id)
               }
           }

           delete dados.perfis //deletando para poder passar os dados de uma vez para função insert

           const [ id ] = await db('usuarios').insert({ ...dados })

            //add perfis setados ao usuarios
            for (perfil_id of idsPerfis){
                await db('usuarios_perfis').insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios').where({ id }).first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}