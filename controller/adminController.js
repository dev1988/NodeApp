const sequelize = require('sequelize');
const Admin = require('../model/User');

module.exports.index = async (req, res) => {
    //console.log(req.session.user.userLoginName)
    res.render('dashboard', {
        loginName: req.session.user.userLoginName,
        title: 'Dashboard'
    }
    );
}
module.exports.profile = async (req, res) => {
    let userDetals = await Admin.findOne({
        where: {
            id: req.session.user.userloginID
        }
    });

    let success = req.flash('success');
    let error = req.flash('error');
    res.render('profile',
        {
            title: 'Profile',
            loginName: req.session.user.userLoginName,
            csrfToken: req.csrfToken(),
            userDetals,
            success,
            error
        });
}
module.exports.updatePofofile = async (req, res) => {
    const body = req.body;
    let updUser = await Admin.update(
        { mobile: body.mobile, dateOfBirth: body.dob },
        { where: { id: req.session.user.userloginID } }
    ).then((updatedRow) => {


        req.flash('success', 'Profile updated successfully');
        res.redirect('/admin/profile');

    });

}