const { Sequelize, DataTypes } = require('sequelize');
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


// Authors.associate = (models) => {
//   // Add the many-to-many association with the papers model
//   console.log("Authors models: ", models);

//   Authors.belongsToMany(models.paper, {
//     through: models.PaperAuthor,
//     foreignKey: 'authorId',
//   });
// };



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
    authorsNames: {
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
const paper_author = sequelize.define('paper_author', {}, { timestamps: false });
Papers.belongsToMany(Authors, { through: "paper_author" })
Authors.belongsToMany(Papers, { through: "paper_author" })

  // Papers.associate = (models) => {
  //   // Add the many-to-many association with the authors model
  //   console.log("papers models: ", models);
  //   // Papers.belongsToMany(models.author, {
  //   //   through: models.PaperAuthor,
  //   //   foreignKey: 'paperId',
  //   // });
  // };

  // Model1.hasMany(Model2, {
  //   foreignKey: 'model1Id',
  // });
  // Model2.belongsTo(Model1, {
  //   foreignKey: 'model1Id',
  // });

  return paper_author

}