const express = require('express');
const userRoutes = require('./routes/userRouter');
const sequelize = require('./config/db');
const umzug = require('./migrations/migration');

const app = express();
app.use(express.json());

// стартовая миграция
const startApp = async () => {
  try {
    await umzug.up(); 
    await sequelize.authenticate();
    console.log('Успешное подключение к базе данных');

    app.listen(3001, () => {
      console.log('Сервер запущен на порту 3001');
    });
  } catch (error) {
    console.error('Ошибка запуска:', error);
  }
};

startApp();

// Регистрация маршрутов
app.use('/api/users', userRoutes);