const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');

router.get('/', async (req, res) => {
    var carts
    var notifications
    var bills
    if (req.user) {
        notifications = await models.notifications.findAll({
            where: { [Op.or]:[{
                [Op.and]:[{ UserIdSaler: req.user.id },{ status: 1 }],
            },{
                [Op.and]:[{ UserIdBuyer: req.user.id },{ status: 0 }]
            }]},
           
            // attributes: ['UserIdSaler', 'UserIdBuyer'],
            include:[{
                model: models.users,
                as:'userBy'
            },{
                model: models.users,
                as:'userSl'
            }]
        })
    } else {
        notifications = []
    }
    return res.json(notifications) ; 
})

router.get('/action', async (req, res) => {
    var carts
    var notifications
    var bills
    if (req.user) {
        notifications = await models.action__notis.findAll({
            where: { [Op.or]:[{
                [Op.and]:[{ UserIdSaler: req.user.id },{ status: 1 }],
            },{
                [Op.and]:[{ UserIdSaler: req.user.id },{ status: 0 }]
            }]},
           
            // attributes: ['UserIdSaler', 'UserIdBuyer'],
            include:[{
                model: models.users,
                as:'user'
            },{
                model: models.users,
                as:'userSaler'
            }]
        })
    } else {
        notifications = []
    }
    return res.json(notifications) ; 
})

router.get('/review', async (req, res) => {
    var carts
    var notifications
    var bills
    if (req.user) {
        notifications = await models.action__notis.findAll({
            where: { [Op.and]:[{ UserIdSaler: req.user.id },{ status: 3 }] },
           
            // attributes: ['UserIdSaler', 'UserIdBuyer'],
            include:[{
                model: models.users,
                as:'user'
            },{
                model: models.users,
                as:'userSaler'
            }]
        })
    } else {
        notifications = []
    }
    return res.json(notifications) ; 
})

router.get('/actionProduct', async (req, res) => {
    var carts
    var notifications
    var bills
    if (req.user) {
        notifications = await models.product__notis.findAll({
            where: { [Op.and]:[{ UserId: req.user.id },{ status: 1 }] },
           
            // attributes: ['UserIdSaler', 'UserIdBuyer'],
            include:[{
                model: models.users,
                as:'user'
            },{
                model: models.products,
                as:'product'
            }]
        })
    } else {
        notifications = []
    }
    return res.json(notifications) ; 
})

router.get('/detail/:id', async (req, res) => {
    var { id } = req.params
    if (req.user) {

        var anhquy = await models.bills.findOne({  
            where: { id: id },
            include: [{
                model: models.bill_details,
                as: 'bill_details',
                // where: { UserIdBuyer: anhquy.UserIdBuyer },
                include: [{
                    model: models.products,
                    as: 'product'
                }]
            }, {
                model: models.users,
            },
            {
                model: models.addresses,
                as: 'addresse',
                include: [{
                    model: models.districts,
                    as: 'district'
                }, {
                    model: models.provinces,
                    as: 'province'
                }]
            },
            {
                model: models.date_orders,
                as: 'date_orders',
            }
            ]
        })
        return res.json(anhquy)
    } else {
        carts = []
    }
    return res.json('ok')
})
module.exports = router;