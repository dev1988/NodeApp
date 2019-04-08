const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_app','root','',{
    host:"localhost",
    dialect:"mysql",
    port:3306,
    logging:false,
    define:{
        timestamp:false
    }
});

module.exports = sequelize;