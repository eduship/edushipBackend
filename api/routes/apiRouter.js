var express = require('express');
var router = express.Router();

var Organisation = require('../../shared/models/organisation');

var read_controller = require('../controllers/readController');
var auth_controller = require('../controllers/authController');
var write_controller = require('../controllers/writeController');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//POST login User
router.post('/login', auth_controller.login);

/*Event Routes*/

//GET List of all events
router.get('/event/all', read_controller.get_event_list);

//GET Find event by Id
router.get('/event/:id', read_controller.get_find_event_by_id);

/*Organisation Routes*/

//GET List of all organisations
router.get('/organisation/all', read_controller.get_organisation_list);

//GET Find organisation by Id
router.get('/organisation/:id', read_controller.get_find_organisation_by_id);


router.get('/test', isAuthenticated, write_controller.test);



module.exports = router;

//middleware to check if the user is Authenticated
function isAuthenticated(req, res, next){
    var token = req.cookies.auth;
    if(token){
        //decode token
        var decoded = jwt.verify(token, config.secret);
        if(decoded){
          //check if a user with the decoded id exists 
          Organisation.findById(decoded.id, (err, user)=>{
            if(err) return next(err);
            return next();
          });
        } else {
          res.status(401).send("Error");
        }
    } else {
      res.status(401).send("Error");
    }
    
  }