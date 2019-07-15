//Só pra salvar os dados fakes que estamos usando sem DB.
const usuarios = [
{
    id: 1,
    nome: 'João da Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 1,
    status: 'ATIVO'
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajr@zemail.com',
    idade: 32,
    perfil_id: 2,
    status: 'INATIVO'
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismith@zemail.com',
    idade: 24,
    perfil_id: 1,
    status: 'BLOQUEADO'
}]

const perfis = [ 
    { id: 1, nome: 'Comum' },
    { id: 2, nome: 'Administrador' }]

module.exports = { usuarios, perfis }