const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bootcamp = sequelize.define('bootcamp', { 
    title: { 
        type: DataTypes.STRING 
    }, 
    cue: { 
        type: DataTypes.STRING 
    },
    description: { 
        type: DataTypes.STRING 
    } 
});

module.exports = Bootcamp;