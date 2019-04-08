module.exports.isNotLogin = async(req,res,next)=>{
    if(!req.session.user)
        return res.redirect('/');
    next();
    //console.log(req.session.user);
}
module.exports.isLogin = (req,res,next)=>{
    if(req.session.user)
        return res.redirect('admin/dashboard');
        
    next();
}