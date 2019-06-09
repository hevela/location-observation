'use strict';

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
    return queryInterface.bulkInsert('Locations', [
        {
          name: 'Best Buy Ciudadela',
          latitude: 20.6485964,
          longitude: -103.4252563,
          open: true,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
        {
          name: 'Hotel InterContinental Presidente Guadalajara',
          latitude: 20.6485964,
          longitude: -103.4252563,
          open: true,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
        {
          name: 'Paulette Patisserie',
          latitude: 20.6449017,
          longitude: -103.4139695,
          open: false,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
