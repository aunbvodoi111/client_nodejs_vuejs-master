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
    var cates = await models.cates.findAll({})
    var products = await models.products.findAll({
        // include: [{
        //   model: models.Product,
        //   as: 'products'
        // }]
    })
    var carts = []
    var anhquy
    if (req.user) {
        var findCart = await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        })
        if (findCart) {
            carts = await models.carts.findAll({
                where: { UserIdBuyer: findCart.UserIdBuyer },
                include: [{
                    model: models.cart_details,
                    as: 'cart_details',
                    where: { UserIdBuyer: findCart.UserIdBuyer },
                    include: [{
                        model: models.products,
                        as: 'HomeTeam'
                    }]
                }, {
                    model: models.users,
                }]
            })
        } else {
            carts = []
            return res.send({ products: products, cates: cates, carts: carts })
        }

    } else {
        carts = []
    }

    return res.send({ products: products, cates: cates, carts: carts })
})

router.get('/danhmuc/:id', async (req, res) => {
   var cates =  await models.cates.findOne({
        where: { id: req.params.id },
        include: [{
            model: models.subcates,
            as : 'subcates',
            include: [{
                model: models.products,
                as : 'products',
            }]
        }]
    });
    // var products = await models.products.findAll({
    //     where: { id: req.params.id },
    // })
    return res.send({cates: cates })
})



router.get('/shop/:id', async (req, res) => {
    console.log(req.user)
    var { id } = req.params
    var products = await models.products.findAll({
        where: { UserId: id },
        include: [{
            model: models.users,

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

        var allOrders = []
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
    if (req.user) {
        var follows = await models.follows.findAll({
            where: {
                [Op.or]: [
                    { ProductId: id },
                    { UserId: req.user.id },
                ]
            }
        });
    }
    var carts = []
    var anhquy
    if (req.user) {
        var findCart = await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        })
        if (findCart) {
            console.log('ok dc k ')
            carts = await models.carts.findAll({
                where: { UserIdBuyer: findCart.UserIdBuyer },
                include: [{
                    model: models.cart_details,
                    as: 'cart_details',
                    where: { UserIdBuyer: findCart.UserIdBuyer },
                    include: [{
                        model: models.products,
                        as: 'HomeTeam'
                    }]
                }, {
                    model: models.users,
                }]
            })
            return res.send({ products: products, count: count, follows: follows, carts: carts })
        } else {
            carts = []

        }

    } else {
        carts = []
    }
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