const { Sequelize } = require('sequelize');
const UserModel = require('./models/user')
const CandidatoModel = require('./models/candidato')
const VacanteModel = require('./models/vacante')


// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('globalImpact', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize)
const Vacante = VacanteModel(sequelize, Sequelize)
const Candidato = CandidatoModel(sequelize, Sequelize)

sequelize.sync({ force: false})
  .then(() => {
    console.log('Tablas Sincronizadas')
  })

module.exports = {
  User,
  Vacante,
  Candidato
};