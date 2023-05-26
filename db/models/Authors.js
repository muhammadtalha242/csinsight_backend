// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Authors = sequelize.define('author', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    affiliations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orcid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'authors',
    timestamps: false,
  });

  Authors.associate = (models) => {
    // Add the many-to-many association with the papers model
    console.log("Authors models: ", models);

    Authors.belongsToMany(models.paper, {
      through: models.PaperAuthor,
      foreignKey: 'authorId',
    });
  };

  return Authors
}
