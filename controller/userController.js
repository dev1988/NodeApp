const sequelize = require('sequelize');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const Op = sequelize.Op;

module.exports.index = async(req,res)=>{
    res.render('user/login',{
        error:req.flash('error'),
        csrfToken:req.csrfToken(),
        title:'Log in'
    }
        );
}

module.exports.signUpform = async(req,res)=>{
     
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('user/registration',
    {
        title:'Registration',
        error,success,
        csrfToken:req.csrfToken()
    }
    );
}
module.exports.signUp = async(req,res)=>{
    var body = req.body;
    if(body.firstName=='' || body.email ===''|| body.userName==='' ||body.password==='')
    {
        req.flash('error','Please fill all the fields');
    }
    else{ 

    let firstName = body.firstName;
    let lastName = body.lastName;
    let email = body.email;
    let mobile = body.mobile;
    let password = body.password
    let userName = body.userName;
    await User.count({
        where:{
            [Op.or]:[{email:body.email},{userName:userName}]
    }})
    .then((count)   =>{
        if(count>0)
        {
            console.log(count)
            req.flash('error','User already exists');
        }
        else{
            User.create({
                    firstName,
                    lastName,
                    email,
                    mobile,
                    password,
                    userName
                });
        req.flash('success','You have registered successfully');
        }
    });
 
    req.session.signUp = 1;
   
    res.redirect('/registration');
}
};
module.exports.login = async(req,res)=>{
    let body = req.body;
    const isUser = await User.findOne({
        where:{
            [Op.or]:[{email:body.email},{userName:body.email}]
        }
    });
    if(!isUser)
    {
         req.flash('error','Invalid email/username');
        return res.redirect('/')
    }
   
     let isAuth = bcrypt.compareSync(body.password,isUser.password);
     if(isAuth)
     {
        //session
        req.session.user={
            userloginID : isUser.id,
            userLoginName:isUser.firstName,
            userLoginEmail:isUser.email,
            userLoginUname:isUser.userName
        }
        res.redirect('admin/dashboard');
     }
     else{
       req.flash('error','Password miss match');
        res.redirect('/login');
     }
}
module.exports.logOut = async(req,res)=>{
    req.session.destroy();
    res.redirect('/')
}
module.exports.reset = async(req,res)=>{
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('user/reset',{
        title:'Reset Password',
        success,
        error,
        csrfToken:req.csrfToken()
    });
}
module.exports.resetPassword = async(req,res)=>{
    
}