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
      type: DataTypes.STRING,
    },
    name: { type: DataTypes.STRING, },
    aliases: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    affiliations: {
      type: DataTypes.STRING
    },
    homepage: {
      type: DataTypes.STRING
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    orcid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'authorTable',
    timestamps: false,
  });
  // console.log("Papers: ", Papers);
  // Authors.belongsToMany(Papers, {through: "paper_author"})

  Authors.associate = (models) => {
    // Add the many-to-many association with the papers model
    console.log("Authors models: ", models);

    Authors.belongsToMany(models.paper, {
      through: "PaperAuthor",
      foreignKey: 'authorId',
    });
  };

  return Authors
}

