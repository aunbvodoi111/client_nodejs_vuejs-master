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
    var { ProductId, qty, user } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    var roomfind = await models.rooms.findOne({
        where: {
            [Op.or]: [
                {

                    [Op.and]:
                        [{ UserName2: req.user.name }, { UserName1: user.name }]

                },
                {

                    [Op.and]:
                        [{ UserName1: req.user.name }, { UserName2: user.name }]

                }
            ]
        }
    })
    console.log(roomfind)
    if (!roomfind) {
        console.log('dấdsas')
        var room = await models.rooms.create({ name: req.user.name + user.name, UserName1: req.user.name, UserName2: user.name });
        room.save()
        var rooms  = await models.rooms.findAll({
            where:{ [Op.or]: [ { UserName1: req.user.name }, { UserName2: req.user.name }] },
            include: [{
                model: models.messagers,
                as: 'messagers',
            }]
        })
        return res.json(rooms)
    }
    var rooms  = await models.rooms.findAll({
        where:{ [Op.or]: [ { UserName1: req.user.name }, { UserName2: req.user.name }] },
        include: [{
            model: models.messagers,
            as: 'messagers',
        }]
    })
    return res.json(rooms)
    // const wishesFind = await models.carts.findOne({
    //     where: { UserId: req.user.id, ProductId: ProductId }
    // })
    // if (wishesFind) {
    //     var qtyBd = wishesFind.qty
    //     wishesFind.update({
    //         qty: qtyBd + qty
    //     })
    // } else {

    // }
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
    var rooms
    if (req.user) {
        rooms = await models.rooms.findAll({
            where: {
                [Op.or]: [{ UserId1: req.user.id }, { UserId2: req.user.id }]
            }
        })
    } else {
        rooms = []
    }
    return res.json(rooms)
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