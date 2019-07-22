const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')

module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            const [ id ] = await db('perfis').insert({ ...dados })
            return db('perfis').where({ id }).first()   //insere e faz busca do objeto
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if (perfil){
                const { id } = perfil
                await db('usuarios_perfis').where({ perfil_id: id }).delete() //retirando os relacionamentos do perfil a ser excluído
                await db('perfis').where({ id }).delete()
            }
            return perfil
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if (perfil){
                const { id } = perfil
                await db('perfis').where({ id }).update(dados)               
            }
            return { ...perfil, ...dados } //retornando o dado atualizado
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}