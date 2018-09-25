var bcrypt = require('bcryptjs');
var Organisation = require('../../shared/models/organisationConfirm');

const hashRounds = 10;

exports.confirm_organisation = function(req, res, next){
    //generate password hash
    var password_hash = bcrypt.hashSync(req.params.password, hashRounds);
    
    var organisation = {
        name: req.params.name,
        hash: password_hash,
        email: re.params.email,
        events: []
    };

    Organisation.create(organisation, function(req, res, next){
        if (err) return next(err);
    });
}