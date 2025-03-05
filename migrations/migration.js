// моя конфигурация для миграций
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../config/db');
const { User } = require('../models/userModel');

const umzug = new Umzug({
  migrations: [
    {
      name: 'create-users-table',
      up: async () => {
        await sequelize.sync(); 
        await User.create({ balance: 10000 }); 
      },
      down: async () => {
        await User.drop(); 
      },
    },
  ],
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

module.exports = umzug;