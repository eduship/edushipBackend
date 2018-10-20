var Organisation = require('../../shared/models/organisation');
var OrganisationConfirm = require('../../shared/models/organisationConfirm');

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
        OrganisationConfirm.find({}, function(err, orgs){
            if (err) return next(err);
            res.render('list', {organisations : orgs});
        });
    } else {
        res.redirect('/login');
    }
}

exports.post_confirm_organisation = function(req, res, next){
    
    var organisation = new Organisation({
        name: req.body.name,
        hash: req.body.password,
        email: req.body.email,
        events: []
    });

    Organisation.create(organisation, function(err){
        if (err) return next(err);
    });

    OrganisationConfirm.findByIdAndDelete(req.body.id, function(err){
        if(err) return next(err);
    });

    res.redirect('/list');
}