const { usuarios, perfis } = require('../data/db')

module.exports = {
    ola() {
        return 'Basta retornar uma String'
    },
    horaAtual(){
        return new Date
    },
    usuarioLogado() {
        return {
            id: 1,
            nome: 'Ana da Web',
            email: 'anadaweb@email.com',
            idade: 23,
            salario_real: 1234.56,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            id: 2,
            nome: 'Sabão de Barra',
            preco: 53.54,
            desconto: 15
        }
    },
    numerosMegaSena() {
        //return [4, 8, 13, 27, 33, 54]
        const crescente = (a, b) => a - b
        return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    //usuario(_, { id }) melhor forma de usar do que acessar args
    usuario(_, args) {
        const sels = usuarios.filter(u => u.id === args.id)
        return sels ? sels[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const sels = perfis.filter(p => p.id === id)
        return sels ? sels[0] : null
    }
}