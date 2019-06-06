const User = require('../models').Users

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const users = [{
      username: 'Snoop',
      password: 'Dog',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }, {
      username: 'admin',
      password: 'secure-password-123-#',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }];
    return User.bulkCreate(users, {
      validate:true,
      individualHooks: true
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
