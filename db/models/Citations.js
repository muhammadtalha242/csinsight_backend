// const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Citations = sequelize.define(
    "citations",
    {
      citationid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      citingcorpusid: {
        type: DataTypes.INTEGER,
      },
      citedcorpusid: {
        type: DataTypes.INTEGER,
      },
      isinfluential: {
        type: DataTypes.BOOLEAN,
      },
      contexts: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      intents: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.TEXT)),
      },
    },
    {
      tableName: "citations",
      timestamps: false,
    }
  );

  return Citations;
};
