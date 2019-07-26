const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
   //Somente em desenvolvimento, depois temos que comentar (simular usuário Logado)
   //await require('./simularUsuarioLogado')(req)
   
   const auth = req.headers.authorization
   const token = auth && auth.substring(7)

   let usuario = null
   let admin = null

   if (token) {
      //lógica para validar o token e obter as informações do payload e assim ter os dados do usuario
      try {
         let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET)
         //verificar se o token ta expirado
         if (new Date(conteudoToken.exp * 1000) > new Date()){
            usuario = conteudoToken
         }
      } catch(e) {
         //token inválido
      }
   }

   if (usuario && usuario.perfis){
      admin = usuario.perfis.includes('admin')
   }

   const err = new Error('Acesso Negado') // criando um erro

   return {
      usuario,
      admin,
      validarUsuario(){
         if(!usuario) throw err //lançamento do erro
      },
      validarAdmin(){
         if(!admin) throw err //valida se o usuário é admin
      },
      validarUsuarioFiltro(filtro){
         if (admin) return
         if(!usuario) throw err
         if(!filtro) throw err
         
         const { id, email } = filtro
         if ( !id && !email ) throw err
         if( id && id !== usuario.id) throw err
         if (email && email !== usuario.email ) throw err
      }
   }

}