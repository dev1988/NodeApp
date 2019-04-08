const sequelize = require('../config/config');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:Sequelize.STRING(200),
    lastName:Sequelize.STRING(200),
    mobile:Sequelize.STRING(10),
    email:Sequelize.STRING(255),
    userName:Sequelize.STRING(100),
    password:Sequelize.STRING(255),
    dateOfBirth:Sequelize.DATE,
    qualification:Sequelize.STRING(10),
    profilePic:Sequelize.STRING(255),
    gender:Sequelize.ENUM('male','female'),
    status:{
        type:Sequelize.ENUM('pending','accepted','cancelled','rejected'),
        defaultValue:'pending',
    }
});
User.beforeCreate((user,options)=>{
 let hash = bcrypt.hashSync(user.password,10);
 user.password = hash;
});
module.exports = User;