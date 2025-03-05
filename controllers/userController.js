// логика работы с пользователем
const { User } = require('../models/userModel')
const sequelize = require('../config/db');


const updateUserBalance = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
      
    const transaction = await sequelize.transaction(); 
  
    try {
      const user = await User.findByPk(userId, {
        lock: true,
        transaction: transaction,
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Пользователя не существует.' });
      }
  
      const updatedBalance = user.balance + amount;
  
      if (updatedBalance < 0) {
        return res.status(400).json({ error: 'Недостаточно средств на балансе' });
      }
  
      user.balance = updatedBalance;
      await user.save({ transaction });
  
      await transaction.commit(); 
  
      res.json({ message: 'Баланс успешно обновлен', balance: user.balance });
    } catch (error) {
      await transaction.rollback(); 
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };
  


module.exports = { updateUserBalance }

