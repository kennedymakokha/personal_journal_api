import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_journal', 'kennedy', 'my_secure_password', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));