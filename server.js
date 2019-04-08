const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/config');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const crypto = require('crypto');

//variable declaration
const port = 1000 || process.env.PORT;


const app = express();

app.use(express.static(path.join(__dirname,"public")));


//middlewares
let csurfProtection = csrf();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

//session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { /*secure: true*/ }
  }))

  //authentication middleware
  const isAuthenticate = require('./middleware/authentication');

//set view  engine ejs
app.set("view engine","ejs");

//dabase connection
sequelize
.authenticate()
.then(()=>{
    console.log(`database connected successfully`);
})
.catch(err=>{
    console.log("Unable to connect database",err)
});

//synchronize sequelize so that it can create talble as per module if table not exists.
sequelize.sync();

app.use(flash());
app.use(csurfProtection);

//importing routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use('/',userRoutes);
app.use('/admin',isAuthenticate.isNotLogin,csurfProtection,adminRoutes);


app.listen(port,function(){
    console.log(`localhost running at port ${port}`)
})
