// Usado para configurar a conexão com o banco de dados
//aqui terá só uma conexão, porém o knex suporta várias conexões (desenvolvimento, homologação e produção) por exemplo.

//importando os dados de conexão do arquivo .env
const { connection } = require('./.env')

module.exports = {

  client: 'mysql',
  connection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
