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
    var { ProductId, qty, UserIdSaler } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log(req.body)
    const wishesFind = await models.carts.findOne({
        where: {
            [Op.and]:
                [{ UserIdBuyer: req.user.id }, { UserIdSaler: UserIdSaler }]
        }
    })
    if (wishesFind) {
        const cartDetail = await models.cart_details.findOne({
            where: {
                [Op.and]:
                    [{ ProductId: ProductId }, { UserIdBuyer : req.user.id }]
            }
        })
        if (cartDetail) {
            console.log('vao dc day k ')
            var qtyBd = cartDetail.qty
            cartDetail.update({
                qty: qtyBd + qty
            })
            return res.status(200).json(cartDetail)
        } else {
            var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id ,CartId : wishesFind.id });
            return res.status(200).json(cart_detail)
        }
    } else {
        var cart = await models.carts.create({ UserIdSaler: UserIdSaler, UserIdBuyer: req.user.id });
        cart.save()
        var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id, CartId : cart.id });
        cart_detail.save()
    }
    return res.status(200).json(wishesFind)
})


router.post('/addCartCustomer', async (req, res) => {
    var { carts , AddressId } = req.body
    console.log(carts)
    for (var i = 0; i < carts.length; i++) {
        var bills = await models.bills.create({
            UserIdBuyer: carts[i].UserIdBuyer,
            UserIdSaler: carts[i].UserIdSaler,
            sum: 0,
            note: 'aaaa',
            AddressId : AddressId,
            date_order: '30/1/2019',
            payment: 1,
        });
        bills.save()
        await models.notifications.create({
            BillId : bills.id,
            UserIdSaler : bills.UserIdSaler,
            UserIdBuyer : bills.UserIdBuyer,
            content : 'đã hủy đơn hàng .Vui lòng liên hệ với người mua để biết thông tin'
        })
        
        var sum = 0
        for (var j = 0; j < carts[i].cart_details.length; j++) {
            var bill_details = await models.bill_details.create({
                UserIdBuyer: carts[i].cart_details[j].UserIdBuyer,
                UserIdSaler: carts[i].cart_details[j].UserIdSaler,
                Product_Id: carts[i].cart_details[j].ProductId,
                BillId: bills.id,
                image: carts[i].cart_details[j].HomeTeam.image,
                qty: carts[i].cart_details[j].qty,
                price: carts[i].cart_details[j].HomeTeam.discount,
                content: 1,
                name: 'anqnh',
            });
            
            bill_details.save() 
            var product = await models.products.findOne({ where:{ id : carts[i].cart_details[j].ProductId }})
            var qty = product.qty
            product.update({ 
                qty : qty - carts[i].cart_details[j].qty
            })
            sum = sum + carts[i].cart_details[j].HomeTeam.discount * carts[i].cart_details[j].qty;
        }
        const wishesFind = await models.bills.findOne({
            where: { id: bills.id }
        })

        if(wishesFind){
            wishesFind.update({
                sum: sum
            })
        }
    }
    
    for (var i = 0; i < carts.length; i++) {
        await models.carts.destroy({ where: { id: carts[i].id }})
    }
    
    await models.date_orders.create({
        BillId : bills.id
    })
    return res.status(200).json(bill_details)
    
})

router.post('/changeQty', async (req, res) => {
    var { ProductId, qty } = req.body

    const wishesFind = await models.cart_details.findOne({
        where: { UserIdBuyer: req.user.id, ProductId: ProductId }
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

router.post('/changeCheckBuy', async (req, res) => {
    var { id, checkBuy } = req.body

    const wishesFind = await models.cart_details.findOne({
        where: { id: id }
    })
    if (wishesFind) {
        wishesFind.update({
            checkBuy: checkBuy
        })
    } else {
        var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id, qty: qty });
        cart.save()
    }
    return res.status(200).json('ok')
})

router.post('/deleteCart', async (req, res) => {
    var { ProductId, qty } = req.body

    const wishesFind = await models.cart_details.findOne({
        where: { UserIdBuyer: req.user.id, ProductId: ProductId }
    })
    if (wishesFind) {
        wishesFind.destroy({})
    }
    return res.status(200).json('ok')
})

router.get('/', async (req, res) => {
    var carts = []
    var anhquy
    if (req.user) {
        var findCart = await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        })
        if (findCart) {
            console.log('ok dc k ')
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
            return res.json(carts)
        } else {
            carts = []

        }

    } else {
        carts = []
    }
    return res.json(carts)
})

router.get('/checkout', async (req, res) => {
    var carts
    var anhquy
    if (req.user) {
        var provinces = await models.provinces.findAll({})
        var districts = await models.districts.findAll({})  
        var  addresss = await models.addresses.findAll({
            include: [{
                model: models.districts,
                as: 'district'
            },{
                model: models.provinces,
                as: 'province'
            }]
        })
        // provinces = await models.provinces.findAll({})
        // districts = await models.districts.findAll({})
        await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        }).then(function (projects) {

            anhquy = projects
        })
        var hahha
        hahha = [1, 2, 3, 4, 5]
        carts = await models.carts.findAll({
            where: { UserIdBuyer: anhquy.UserIdBuyer },
            include: [{
                model: models.cart_details,
                as: 'cart_details',
                where: {
                    [Op.and]:
                        [{ UserIdBuyer: anhquy.UserIdBuyer }, { checkBuy: 1 }]
                },
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
    var users = await models.users.findOne({
        where: { id: req.user.id },
        include: [{
            model: models.addresses,
            as: 'addresses',
            include: [{
                model: models.districts,
                as: 'district'
            },{
                model: models.provinces,
                as: 'province'
            }]
        }]
    }) 
    return res.send({ carts: carts, provinces: provinces, districts: districts , users : users})
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