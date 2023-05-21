const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const ApiKey = sequelize.define('api_key', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hashed: {
      type: Sequelize.STRING,
    },
  });

  ApiKey.associate = (models) => {
    ApiKey.belongsTo(models.grow_controller, { foreignKey: 'growControllerId', as: 'growController' });
  };

  return ApiKey;
};
