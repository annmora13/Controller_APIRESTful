const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bootcamp = sequelize.define('bootcamp', { 
    name: { 
        type: DataTypes.STRING 
    } 
});

module.exports = Bootcamp;