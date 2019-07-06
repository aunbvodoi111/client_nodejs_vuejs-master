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
        var anhquy = await models.bills.findAll({
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
        return res.json(anhquy)
    } else {
        carts = []
    }
    return res.json('ok')
})

module.exports = router;