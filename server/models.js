var Sequelize = require('sequelize');
 
module.exports = function (sequelize) {
    var Person = sequelize.define("people", {
        person_id: {type: Sequelize.INTEGER, primaryKey: true},
        full_name: Sequelize.STRING,
        email: Sequelize.STRING
        }, 
        {timestamps: false});
    return {
        Person: Person
    };
};