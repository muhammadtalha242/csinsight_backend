// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const PaperAuthor = sequelize.define('PaperAuthor', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        tableName: 'PaperAuthor',
        timestamps: false,
    });

    return PaperAuthor
}
