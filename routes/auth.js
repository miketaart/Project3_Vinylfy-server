const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const createError = require('http-errors')
const User = require("../models/User");
const router = express.Router();

router.route("/signup")
    .post((req, res, next) => {

        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (`err`) return next(createError(500, "Hashing failed", err));
            User.findOne({
                    username: req.body.username
                })
                .then((user) => {
                    if (user) {
                        throw new Error("Username already exists");
                    }
                    return User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    })
                })
                .then((user) => {
                    req.session.user = user;
                    console.log("USER CREATED", user)
                    res.json(user);
                })
                .catch((error) => {
                    if (error.message === "Username already exists") next(createError(400, error.message));
                    else if (error.name === "ValidationError") next(createError(400, error.message));
                    else next(createError(500, "Database error", error));
                })

        });
    })



router.route("/login")
    .post((req, res) => {
        User.findOne({
                username: req.body.username
            }) //{$or: [{username: req.body.username}, {email: req.body.username}]})
            .then((user) => {
                if (!user) res.status(403).json({
                    'user': 'username does not exist'
                })
                else {
                    bcrypt.compare(req.body.password, user.password, function (err, correct) {
                        if (correct) {
                            req.session.user = user;
                            res.status(200).json(user);
                        } else {
                            res.status(403).json({
                                "user": "wrong password"
                            });
                        }
                    });
                }
            })
    })

router.delete("/logout", (req, res) => {
    req.session.destroy(); // delete all data attached to the session
    res.status(200).send("logged out");
})

module.exports = router;