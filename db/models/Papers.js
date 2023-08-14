// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  const Papers = sequelize.define('paper', {
    corpusid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    externalids:{
      type:DataTypes.JSON,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    publicationvenueid:{
      type: DataTypes.TEXT
    },
    referencecount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    s2fieldsofstudy: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    publicationtypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    journal: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    influentialcitationcount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    citationcount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url: {
      type:DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    venue: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isopenaccess:{
      type: DataTypes.BOOLEAN
    },
    venueId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    publicationdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'papers',
    timestamps: false,
  });

  Papers.associate = (models) => {
    Papers.belongsToMany(models.authorTable, {
      through: "PaperAuthor",
      foreignKey: 'paperId',
    });
  };
  return Papers
}
