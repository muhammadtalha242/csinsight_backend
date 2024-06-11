const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Venue = sequelize.define("venue", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alternate_issns: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    alternate_names: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    alternate_urls: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    issn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Venue;
};
