const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    //primeiro pesquisar para ver se ja existe, caso exista atualize, senão salva pela primeira vez
    let usuario = await db('usuarios').where({ email }).first()

    if(!usuario) {
        //inserindo
        let [ id ] = await db('usuarios').insert({ nome, email, senha })
        //pegando todo o usuario pelo id (Mysql só devolve o id após inserir, postgres devovle tudo de cara)
        usuario = await db('usuarios').where({ id }).first()
    } else {
        await db('usuarios').where({ id: usuario.id }).update({ nome, email, senha })
        //assim atualiza sem precisar ir no banco buscar (sobrescreve)
        usuario = { ...usuario, nome, email, senha }
    }

    return usuario
}

async function salvarPerfil(nome, rotulo) {
    //primeiro pesquisar para ver se ja existe, caso exista atualize, senão salva pela primeira vez
    let perfil = await db('perfis').where({ nome }).first()

    if(!perfil) {
        //inserindo
        let [ id ] = await db('perfis').insert({ nome, rotulo })
        //pegando todo o perfil pelo id (Mysql só devolve o id após inserir, postgres devovle tudo de cara)
        perfil = await db('perfis').where({ id }).first()
    } else {
        await db('perfis').where({ id: perfil.id }).update({ nome, rotulo })
        //assim atualiza sem precisar ir no banco buscar (sobrescreve)
        perfil = { ...perfil, nome, rotulo }
    }

    return perfil
}

async function adicionarPerfis(usuario, ...perfis){
    const usuario_id = usuario.id
    //limpando os relacionamentos que usuario tem para setar os novos
    await db('usuarios_perfis').where({ usuario_id }).delete()
    for (perfil of perfis) {
        const perfil_id = perfil.id
        await db('usuarios_perfis').insert({ usuario_id, perfil_id })
    }
}

async function executar() {
    const usuario = await salvarUsuario('Ana Silva', 'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())