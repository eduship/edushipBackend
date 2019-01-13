var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../../shared/models/organisation');
var config = require('../config');

//function to login the user
exports.login = (req, res, next) => {
    //check if one User with given username exists
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) return next(err);
        if(user){
            //check password
            result = bcrypt.compareSync(req.body.password, user.password);
            if(err) return next(err);
            if(result){
                //sign token
                var token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 360
                });
                //send token
                res.json({
                    token: token
                });
            }
        }
    });
}