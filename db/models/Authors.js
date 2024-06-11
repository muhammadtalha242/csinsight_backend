const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Authors = sequelize.define('authorTable', {
    authorid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    externalids: {
      type: DataTypes.JSON,
    },
    url: {
      type: DataTypes.TEXT,
    },
    name: { type: DataTypes.TEXT, },
    aliases: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    affiliations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    homepage: {
      type: DataTypes.TEXT
    },
    papercount: {
      type: DataTypes.INTEGER
    },
    citationcount: {
      type: DataTypes.INTEGER
    },
    hindex: {
      type: DataTypes.INTEGER
    },
    updated: {
      type: DataTypes.DATE,
    }
    ,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    orcid: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'authorTable',
    timestamps: false,
  });
  Authors.associate = (models) => {

    Authors.belongsToMany(models.paper, {
      through: "paperAuthor",
      foreignKey: 'authorId',
    });
  };

  return Authors
}

