const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');

router.get('/', async (req, res) => {
    var carts
    var anhquy
    if (req.user) {
        await models.bills.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        }).then(function (projects) {
            anhquy = projects
        })
        if (anhquy) {
            anhquy = await models.bills.findAll({
                where: { UserIdBuyer: anhquy.UserIdBuyer },
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
                }]
            })
            // return res.json(anhquy)
        }

    } else {
        anhquy = []
    }
    return res.json(anhquy)
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
                },{
                    model: models.provinces,
                    as: 'province'
                }]
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