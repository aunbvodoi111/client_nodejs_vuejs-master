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
    var { phone , name , ProvinceId , DistrictId , address } = req.body
    console.log( req.body )
    var addresseNew = await models.addresses.create({ phone: phone, UserId : req.user.id ,name: name ,address :  address , ProvinceId : ProvinceId , DistrictId : DistrictId});
    addresseNew.save()
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



module.exports = router;