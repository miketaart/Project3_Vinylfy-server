const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const createError = require('http-errors')
const User = require("../models/User");
const router = express.Router();


router.route("/signup")
    .post((req, res) => {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            .then((user) => {
                res.status(200).json({'user': 'user account successfully created'}); //redirect with react?

            })
            .catch((error) => {
                res.status(400).json({'user': 'failed to create account'});
            })
        }); 
    })


router.route("/login")
.post((req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(!user) res.status(403).json({'user': 'username does not exist'}) //redirect with react
            else { 
                bcrypt.compare(req.body.password, user.password, function(err, correct) {
                    if(correct) {
                        res.status(400).json({'user': 'successfully logged in'}) //redirect with react
                    } else {
                        res.status(403).json({"user": "database error"});        
                    }
                });                
            }
        })
})


// router.route("/username-availability/:username")
// .get((req,res)=> {
//     User.findOne({username: req.params.username}) // statics
//         .then((guide)=> {
//             if(guide) res.json({available: false});
//             else res.json({available: true});
//         })
//         .catch((error)=> {
//             res.json(createError(500, "A server error has occurred."));
//         })
// })

module.exports = router;