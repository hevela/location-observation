'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    open: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {});
  Locations.associate = function(models) {
    // associations can be defined here
  };
  return Locations;
};