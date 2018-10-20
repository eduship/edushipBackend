var bcrypt = require('bcryptjs');
var Organisation = require('../../shared/models/organisation');
var OrganisationConfirm = require('../../shared/models/organisationConfirm');

const hashRounds = 10;

exports.get_organisation_detail = function(req, res, next){
    if(req.user){
        OrganisationConfirm.findById(req.params.id, function(err, oc){
            if (err) return next(err);
            res.render('detail', {organisation : oc});
        });
    } else {
        res.redirect('/login');
    }
}

exports.get_organisation_list = function(req, res, next){
    if(req.user){
        OrganisationConfirm.find(function(err, orgs){
            console.log(orgs);
            if (err) return next(err);
            res.render('list', {organisations : orgs});
        });
    } else {
        res.redirect('/login');
    }
}

exports.post_confirm_organisation = function(req, res, next){
    //generate password hash
    var password_hash = bcrypt.hashSync(req.params.password, hashRounds);
    
    var organisation = new Organisation({
        name: req.params.name,
        hash: password_hash,
        email: req.params.email,
        events: []
    });

    Organisation.create(organisation, function(req, res, next){
        if (err) return next(err);
    });
}