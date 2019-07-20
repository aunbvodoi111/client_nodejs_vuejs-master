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