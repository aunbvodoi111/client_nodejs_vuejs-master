const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');

router.get('/', async (req, res) => {
    var carts
    var anhquy
    var bills
    if (req.user) {
        await models.bills.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        }).then(function (projects) {
            anhquy = projects
        })
        if (anhquy) {
            bills = await models.bills.findAll({
                where: { UserIdBuyer: anhquy.UserIdBuyer },
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: models.bill_details,
                    as: 'bill_details',
                    // where: { UserIdBuyer: anhquy.UserIdBuyer },
                    include: [{
                        model: models.products,
                        as: 'product'
                    },{
                        model: models.classifies,
                        as: 'classifies',
                    }]
                }, {
                    model: models.users,
                }]
            })
            // return res.json(anhquy)
        }else{
            bills = []
        }

    } else {
            bills = []
    }
    return res.json(bills) ; 
})



router.post('/buyerPopChat', async (req, res) => {
    var { id } = req.body
    var carts
    var anhquy
    var bills
    if (req.user) {
        await models.bills.findOne({
            where: { UserIdSaler: id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        }).then(function (projects) {
            anhquy = projects
        })
        if (anhquy) {
            bills = await models.bills.findAll({
                where: { UserIdSaler: anhquy.UserIdSaler },
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: models.bill_details,
                    as: 'bill_details',
                    where: { UserIdSaler: anhquy.UserIdSaler },
                    include: [{
                        model: models.products,
                        as: 'product'
                    },{
                        model: models.classifies,
                        as: 'classifies',
                    }]
                }, {
                    model: models.users,
                }]
            })
            // return res.json(anhquy)
        }else{
            bills = []
        }

    } else {
            bills = []
    }
    return res.json(bills) ; 
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
                },{
                    model: models.classifies,
                    as: 'classifies',
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

router.post('/cancelOrder', async (req, res) => {
    var { item, reason } = req.body
    if (req.user) {
        var bill = await models.bills.findOne({
            where :{ id : item.id },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.bill_details,
                as: 'bill_details',
                // where: { UserIdBuyer: anhquy.UserIdBuyer },
                include: [{
                    model: models.products,
                    as: 'product',
                    include: [{
                        model: models.classifies,
                        as: 'classifies',
                    }]
                }]
            }, {
                model: models.users,
            }]
        })
        await bill.update({
            reason : reason,
            status : 4
        })
        for( var i = 0; i < item.bill_details.length ; i++){
            if( item.bill_details[i].classifies == null ){
                var product = await models.products.findOne({
                    where :{ id : item.bill_details[i].Product_Id }
                })
                var qty  =  product.qty
                product.update({
                    qty : qty + item.bill_details[i].qty
                })
            }else{
                var classify = await models.classifies.findOne({ where: { id: item.bill_details[i].classifies.id } })

                var qty = classify.qty
                await classify.update({
                    qty: qty + item.bill_details[i].qty
                })
            }
            
        }
    }
    return res.json(bill)
})

module.exports = router;