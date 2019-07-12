const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
{
    id: 1,
    nome: 'João da Silva',
    email: 'jsilva@zemail.com',
    idade: 29
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajr@zemail.com',
    idade: 32
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismith@zemail.com',
    idade: 24
}]

const perfis = [ 
    { id: 1, nome: 'Comum' },
    { id: 2, nome: 'Administrador' }]

const typeDefs = gql`
    #Criando um scalar de dado (Parecido com tipo Primitivo)
    scalar Date

    # Criando um Tipo
    type Usuario {
        id: Int!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Perfil {
        id: Int!
        nome: String!
    }

    type Produto {
        id: Int!
        nome: String!
        preco: Float!
        desconto: Int
        precoComDesconto: Float
    }

   

    #Pontos de entrada da sua API! Type pode ser como um objeto com varios attr
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto){
            if(produto.desconto){
               return produto.preco * (1 - produto.desconto/100)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        }
    },
    Query: {
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
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) =>{
    console.log(`Executando Servidor em ${url}`)
})