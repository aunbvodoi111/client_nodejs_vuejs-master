const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy;
// const Anhquy = require('./../models/Anhquy')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');
// Get gig list
router.get('/', async (req, res) => {
    console.log(req.user)
    var products = await models.products.findAll({
        // include: [{
        //   model: models.Product,
        //   as: 'products'
        // }]
    })
    return res.json(products)
})

router.post('/search', async (req, res) => {
    console.log(req.body.keyword)  
    var { keyword } =  req.body
    var products = await models.products.findAll({
         where: { name: { [Op.like]: '%' + keyword + '%' }},limit: 5
    })
    return res.status(200).json(products)
})

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        console.log(req.user)
        return res.send(req.user)
    });


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        var username = await models.users.findOne({
            where: { email: username },
        })
        if (username) {
            bcrypt.compare(password, username.password, function (err, user) {
                if (err) throw err;
                if (user) {
                    console.log('ok')
                    return done(null, username);
                } else {
                    return done(null, false, { message: 'Tài Khoảng Không Đúng' });
                }
            });
        } else {
            return done(null, false, { message: 'Tài Khoảng Không Đúng' });
        }
    }
));

router.get('/detailPr/:id', async (req, res) => {
    var id = req.params.id
    console.log(req.params.id)
    var products = await models.products.findOne({
        where: { id: id },
        include: [{
          model: models.ratings,
          as: 'ratings'
        },{model: models.users}],
        
    })
    return res.json(products)
})
// router.post('/login', async (req, res) => {
//     console.log(req.body)
//     var { email ,password} = req.body
//     var user = await models.users.findOne({
//         where: { email: email },
//     })
//     console.log(user.password)
//     bcrypt.compare(password, user.password, function(err, user) {
//         if(err) throw err;
//         if(user){
//              console.log('ok')
//         }
//     });
//     // var { email ,password} = req.body
//     // console.log(password)
//     // return res.json(products)
// })

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
    console.log(req.body)
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    // Validate Fields
    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!technologies) {
        errors.push({ text: 'Please add some technologies' });
    }
    if (!description) {
        errors.push({ text: 'Please add a description' });
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a contact email' });
    }

    // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

// Search for gigs
router.get('/search', (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
});


passport.serializeUser(function (email, done) {
    done(null, email.id);
});

// passport.deserializeUser(function (id, done) {
//     models.users.findOne({ where: { id: id }}, function (err, email) {
//         done(err, email);
//     });
// });


passport.deserializeUser(function (id, done) {
    console.log(id);
    models.users.findOne({ where: { id: id }}).then((users) => {
        console.log(users);
        return done(null, users);
    });
})
module.exports = router;