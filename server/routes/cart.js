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
    var { ProductId, qty } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log('sdaaaaaaaaaaaaa')
    console.log(qty)
    const wishesFind = await models.carts.findOne({
        where: { UserId: req.user.id, ProductId: ProductId }
    })
    if (wishesFind) {
        var qtyBd = wishesFind.qty
        wishesFind.update({
            qty: qtyBd + qty
        })
    } else {
        var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id, qty: qty });
        cart.save()
    }
    return res.status(200).json('ok')
})

router.post('/changeQty', async (req, res) => {
    var { ProductId, qty } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log('sdaaaaaaaaaaaaa')
    console.log(qty)
    const wishesFind = await models.carts.findOne({
        where: { UserId: req.user.id, ProductId: ProductId }
    })
    if (wishesFind) {
        wishesFind.update({
            qty: qty
        })
    } else {
        var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id, qty: qty });
        cart.save()
    }
    return res.status(200).json('ok')
})

router.post('/deleteCart', async (req, res) => {
    var { ProductId, qty } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log('sdaaaaaaaaaaaaa')
    console.log(qty)
    const wishesFind = await models.carts.findOne({
        where: { UserId: req.user.id, ProductId: ProductId }
    })
    if (wishesFind) {
        wishesFind.destroy({}) 
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
    return res.json(carts)
})

router.get('/anhquy', async (req, res) => {
    const allOrders = await models.products.findAll({
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