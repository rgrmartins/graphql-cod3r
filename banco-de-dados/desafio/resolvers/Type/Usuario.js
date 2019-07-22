const db = require('../../config/db')

module.exports = {
    async perfis(usuario) {
        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfil_id',
                'usuarios_perfis.perfil_id'
            )
            .where({ usuario_id: usuario.id}) //todos os perfis deste usuario repassado
    }
}