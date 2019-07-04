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
    var cates = await models.cates.findAll({})
    return res.send({ products: products, cates: cates })
})

router.get('/shop/:id', async (req, res) => {
    console.log(req.user)
    var { id } = req.params
    var products = await models.products.findAll({
        where: { UserId: id },
        include: [{
            model: models.users,
            as: 'users'
        }]
    })
    return res.json(products)
})

router.get('/search/:keyword', async (req, res) => {
    var { keyword } = req.params
    var products = await models.products.findAll({
        where: { name: { [Op.like]: '%' + keyword + '%' } }, limit: 5
    })
    return res.status(200).json(products)
})

router.post('/search', async (req, res) => {
    var { keyword } = req.body
    var products = await models.products.findAll({
        where: { name: { [Op.like]: '%' + keyword + '%' } }, limit: 5
    })
    return res.status(200).json(products)
})

router.post('/login',
    passport.authenticate('local'),
    async (req, res) => {
        const allOrders = await models.users.findAll({
            where: { id: req.user.id },
            // Make sure to include the products
            include: [{
                model: models.products,
                as: 'products',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                attributes: ['id', 'name', 'price', 'image'],
                through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: models.carts,
                    as: 'carts',
                }
            }]
        });
        return res.send({ user: req.user, carts: allOrders })
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
    var products = await models.products.findOne({
        where: { id: id },
        include: [{
            model: models.ratings,
            as: 'ratings',
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
            },
            { model: models.users },

            ]
        }, { model: models.users },
            {
                model: models.comments,
                as: 'comments',
                include: [{
                    model: models.rep_comments,
                    as: 'req_comments',
                },
                ]
            }
        ],

    })
    var count = await models.wishes.findAll({
        where: { ProductId: id },
    });
    var follows = await models.follows.findAll({
        where: { ProductId: id },
    });
    var carts
    if (req.user) {
        carts = await models.products.findAll({
            include: {
                model: models.users,
                as: 'users',
                required: false,
                where: { id: req.user.id },
                // Pass in the Product attributes that you want to retrieve
                attributes: ['id', 'name'],
                through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: models.carts,
                    as: 'carts',
                }
            }
        })
    } else {
        carts = []
    }
    var cart
    // if (req.user) {
    //     cart = await models.products.findOne({
    //         where:{ id : id },
    //         include: {
    //             model: models.users,
    //             as: 'users',
    //             required: false,
    //             where: { id: req.user.id },
    //             // Pass in the Product attributes that you want to retrieve
    //             attributes: ['id', 'name'],
    //             through: {
    //                 // This block of code allows you to retrieve the properties of the join table
    //                 model: models.carts,
    //                 as: 'carts',
    //             }
    //         }
    //     })
    // } else {
    //     cart.users[0].carts = {}
    // }
    return res.send({ products: products, count: count, follows: follows, carts: carts })
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
    models.users.findOne({ where: { id: id } }).then((users) => {
        return done(null, users);
    });
})
module.exports = router;