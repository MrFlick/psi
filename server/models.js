var Sequelize = require('sequelize');
 
module.exports = function (sequelize) {
    var Person = sequelize.define("people", {
        person_id: {type: Sequelize.INTEGER, primaryKey: true},
        full_name: Sequelize.TEXT,
        email: Sequelize.TEXT
        }, 
        {timestamps: false});
    var Course = sequelize.define("courses", {
        course_id: {type: Sequelize.TEXT, primaryKey: true},
        course_name: Sequelize.TEXT,
        course_desc: Sequelize.TEXT,
        prev_course_id: Sequelize.TEXT
        }, 
        {timestamps: false});
    var Term = sequelize.define("terms", {
        term_id: {type: Sequelize.INTEGER, primaryKey: true},
        term_name: Sequelize.TEXT,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE
        }, 
        {timestamps: false});
    return {
        Person: Person,
        Course: Course,
        Term: Term
    };
};