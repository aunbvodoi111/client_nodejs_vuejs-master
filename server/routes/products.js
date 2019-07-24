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
        order: [
            ['id', 'DESC'],
        ],
        include: [{
            model: models.ratings,
            as: 'ratings',
        }]
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
            // return res.send({ products: products, cates: cates, carts: carts })
        }

    } else {
        carts = []
    }
    var sumQty = 0
    for (var i = 0; i < carts.length; i++) {
        for (var j = 0; j < carts[i].cart_details.length; j++) {
            sumQty = sumQty + carts[i].cart_details[j].qty;
        }
    }
    return res.send({ products: products, cates: cates, sumQty: sumQty })
})

router.get('/danhmuc/:id', async (req, res) => {
    var cates = await models.cates.findOne({
        where: { id: req.params.id },
        include: [{
            model: models.products,
            as: 'products',
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.mulimages,
                as: 'mulimages',
            },{
                model: models.ratings,
                as: 'ratings',
            },{
                model: models.provinces,
                as: 'province',
            }],
        }, {
            model: models.subcates,
            as: 'subcates',
        }]
    });

    return res.send({ cates: cates })
})



router.get('/shop/:id', async (req, res) => {
    console.log(req.user)
    var { id } = req.params
    var products = await models.products.findAll({
        where: { UserId: id },
        include: [
        {
            model: models.ratings,
            as: 'ratings',
        },{
            model: models.users,
        },{ model: models.subcates },
        {
            model: models.provinces,
            as: 'province',
        }
        ]
    })
    var user = await models.users.findOne({
        where :{ id : id}
    })

    var totalProduct = 0
    await models.products.count({
        where: { UserId: user.id },
        include: [{
            model: models.users,
        }]
    }).then(function (count) {
        // count is an integer
        console.log(count)
        totalProduct = count
    });

    var totalRating = 0
    await models.ratings.count({
        include: [{
            where: { UserId: user.id },
            model: models.products,
        }]
    }).then(function (count) {
        // count is an integer
        console.log('dddddddd' + count)
        totalRating = count
    });

    var totalFollow = 0
    await models.follows.count({
        where: { UserIdFollow: user.id },
    }).then(function (count) {
        // count is an integer
        totalFollow = count
    });

    var totalFollow = 0
    var follows = await models.follows.findAll({
        
    })

    // var count = await models.wishes.findAll({
    //     where: { ProductId: id },
    // });
    if (req.user) {
        var follows = await models.follows.findAll({
            where: {
                [Op.or]: [
                    { ProductId: id },
                    { UserId: user.id },
                ]
            }
        });
    }
    return res.send({ products : products , totalProduct : totalProduct , totalRating : totalRating , totalFollow :totalFollow , user : user , follows :follows})
})

router.get('/search/:keyword', async (req, res) => {
    var { keyword } = req.params
    var products = await models.products.findAll({
        where: { name: { [Op.like]: '%' + keyword + '%' } },
        include: [
            { model: models.subcates },
            {
                model: models.ratings,
                as: 'ratings',
            },
            {
                model: models.provinces,
                as: 'province',
            }
        ],
    })
    var users = await models.users.findAll({
        where: { name: { [Op.like]: '%' + keyword + '%' } }
    })
    return res.status(200).send({ products: products, users: users })
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
        var { user } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    var roomfind = await models.rooms.findOne({
        where: {
            [Op.or]: [
                {

                    [Op.and]:
                        [{ UserName2: req.user.id }, { UserName1: req.user.id }]

                },
                {

                    [Op.and]:
                        [{ UserName1: req.user.id }, { UserName2: req.user.id }]

                }
            ]
        }
    })
    console.log(roomfind)

    var rooms  = await models.rooms.findAll({
        where:{ [Op.or]: [ { UserName1: req.user.id }, { UserName2: req.user.id }] },
        include: [{
            model: models.messagers,
            as: 'messagers',
            
            include:[{
                model : models.products,
                as:'product'
              },{
                model : models.bills,
                as:'bill',
                include: [{
                    model: models.bill_details,
                    as: 'bill_details',
                }]
              },{
                model : models.users,
              }]
        },{
            model: models.users,
            as:'user1', 
        },
        {
            model: models.users,
            as:'user2', 
        }]
    })

        return res.send({ user: req.user, carts: allOrders , rooms : rooms })
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


router.post('/filterRating', async (req, res) => {
    var { UserId, value } = req.body
    console.log(req.body)
    if (value < 6) {
        var listRating = await models.product.findAll({
            where: {
                [Op.and]:
                    [{ star: value }, { UserId: UserId }]
            },
            include: [{
                model: models.ratings,
                as: 'ratings',
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }
    else if (value == 7) {
        var listRating = await models.ratings.findAll({
            where: {
                ProductId: ProductId
            },
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }
    else if (value == 8) {
        var listRating = await models.ratings.findAll({
            where: {
                [Op.and]:
                    [{ ProductId: ProductId }, {
                        image: { [Op.ne]: "" }
                    }]
            },
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',

                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }

    return res.status(200).json(listRating)
})


router.get('/detailPr/:id', async (req, res) => {
    var id = req.params.id

    var products = await models.products.findOne({
        where: { id: id },
        include: [{
            model: models.ratings,
            as: 'ratings',
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users },
            ]
        }, { model: models.users },
        { model: models.subcates },
        {
            model: models.comments,
            as: 'comments',
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.rep_comments,
                as: 'req_comments',
            }]
        },
        {
            model: models.mulimages,
            as: 'mulimages',
        },{
            model: models.classifies,
            as: 'classifies',
        }],

    })

    var totalProduct = 0
    await models.products.count({
        where: { UserId: products.user.id },
        include: [{
            model: models.users,
        }]
    }).then(function (count) {
        // count is an integer
        console.log(count)
        totalProduct = count
    });

    var totalRating = 0
    await models.ratings.count({
        include: [{
            where: { UserId: products.user.id },
            model: models.products,
        }]
    }).then(function (count) {
        // count is an integer
        console.log('dddddddd' + count)
        totalRating = count
    });

    var totalFollow = 0
    await models.follows.count({
        where: { UserIdFollow: products.user.id },
    }).then(function (count) {
        // count is an integer
        totalFollow = count
    });

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

        }

    } else {
        carts = []
    }
    var sumQty = 0
    for (var i = 0; i < carts.length; i++) {
        for (var j = 0; j < carts[i].cart_details.length; j++) {
            sumQty = sumQty + carts[i].cart_details[j].qty;
        }
    }
    if(req.user){
        var cart_details = await models.cart_details.findOne({
            where :{ [Op.and]:[{ UserIdBuyer : req.user.id  },{ ProductId : products.id }]}
        })
    }else{
        cart_details = { }
    }
    var productRela = await models.products.findAll({
        where :{ CateId : products.CateId}
    })
    console.log(sumQty)
    return res.send({
        products: products,
        count: count,
        follows: follows,
        sumQty: sumQty,
        totalProduct: totalProduct,
        totalFollow: totalFollow,
        totalRating: totalRating,
        cart_details : cart_details,
        productRela : productRela
    })
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