// const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const PaperAuthor = sequelize.define('paperAuthor', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        tableName: 'paperAuthor',
        timestamps: false,
    });

    return PaperAuthor
}
