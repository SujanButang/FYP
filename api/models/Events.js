const Sequelize = require ("sequelize");
const db = require("../config/database")

const events = db.define(
    "events",{
       event_id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
       },
       user_id:{
        type: Sequelize.INTEGER,
       },
       event_image:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       event_name:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       event_description:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       destination:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       event_date:{
        type: Sequelize.DATE,
        allowNull: false,
       },
       capacity:{
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       status:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       event_type:{
        type: Sequelize.STRING,
        allowNull: false,
       }
    },{
        freezeTableName: true,
        timestamps: false,
      }
);

module.exports = events;