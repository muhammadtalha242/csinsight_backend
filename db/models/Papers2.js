// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const Author = require('./Authors')
module.exports = (sequelize) => {
  // {"corpusid":224735017,"externalids":{"ACL":null,"DBLP":null,"ArXiv":null,"MAG":"952784131","CorpusId":"224735017","PubMed":null,"DOI":null,"PubMedCentral":null},"url":"https://www.semanticscholar.org/paper/97abd35eb7d004e70a58652f2fa762620ad0ea73","title":"当“商业模式”嫁接“职业规划”","authors":[{"authorId":"82841146","name":"杨吉"}],
  //"venue":"","publicationvenueid":null,"year":2012,"referencecount":0,"citationcount":0,"influentialcitationcount":0,"isopenaccess":false,
  //"s2fieldsofstudy":null,"publicationtypes":null,"publicationdate":null,"journal":{"name":"","pages":"96-96","volume":""},"updated":"2022-01-27T01:47:09.787Z"}

  const Papers = sequelize.define('paper2', {
    corpusid: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING
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
      type: DataTypes.ARRAY(DataTypes.STRING),
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
      type:DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isopenaccess:{
      type: DataTypes.BOOLEAN
    },
    venueId: {
      type: DataTypes.STRING,
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
    tableName: 'papers2',
    timestamps: false,
  });

  Papers.associate = (models) => {
    // Add the many-to-many association with the authors model
    console.log("papers models: ", models);
    Papers.belongsToMany(models.authorTable, {
      through: "PaperAuthor",
      foreignKey: 'paperId',
    });
  };
  return Papers
}
