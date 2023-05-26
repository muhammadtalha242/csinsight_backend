const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PaperAuthor = sequelize.define('PaperAuthor', {
       
    }, {
        tableName: 'paper_authors',
        timestamps: false,
    });

    return PaperAuthor;
};
