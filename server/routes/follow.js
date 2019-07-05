const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');
router.post('/add', async (req, res) => {
    var { ProductId ,UserIdFollow  } = req.body
    console.log( req.body )
    const followsFind = await models.follows.findOne({
        where: { UserId: req.user.id , UserIdFollow: UserIdFollow }
    })
    if (followsFind) {
        followsFind.destroy({});
    } else {
        var follows = await models.follows.create({ ProductId: ProductId, UserId: req.user.id , UserIdFollow: UserIdFollow });
        follows.save()
    }
    return res.status(200).json('ok')
})

router.get('/delete/:id', async (req, res) => {
    var { id  } = req.params
    console.log( req.body )
    const followsFind = await models.follows.findOne({
        where: { UserIdFollow: id }
    })
    if (followsFind) {
        followsFind.destroy({});
    } 
    return res.status(200).json('ok')
})

router.get('/', async (req, res) => {
    // const allOrders = await models.products.findAll({

    //     // Make sure to include the products
    //     include: [{
    //         model: models.users,
    //         as: 'users',
    //         required: false,
    //         // Pass in the Product attributes that you want to retrieve
    //         attributes: ['id', 'name'],
    //         through: {
    //             // This block of code allows you to retrieve the properties of the join table
    //             model: models.carts,
    //             as: 'carts',
    //         }
    //     }]
    var carts
    if (req.user) {
        carts = await models.products.findAll({
            include: [{
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
            }]
        })
    } else {
        carts = []
    }
    return res.json(carts)
})

router.get('/anhquy', async (req, res) => {
    const allOrders = await models.products.findAll({

        // Make sure to include the products
        include: [{
            model: models.users,
            as: 'users',
            required: false,
            where: { id: 2 },
            // Pass in the Product attributes that you want to retrieve
            attributes: ['id', 'name'],
            through: {
                // This block of code allows you to retrieve the properties of the join table
                model: models.carts,
                as: 'carts',
            }
        }]
    })
    return res.json(allOrders)
})

module.exports = router;