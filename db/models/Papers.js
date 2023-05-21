// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Papers = sequelize.define('paper', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    abstractText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    dblpId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fieldsOfStudy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    inCitations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    inCitationsCounts: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    openAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    outCitations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    outCitationsCounts: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pfdUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfPaper: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    venueId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearPublished: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'papers',
    timestamps: false,
  });

  return Papers
}
