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
            where: { ProductId: ProductId }
        })
        if (cartDetail) {
            console.log('vao dc day k ')
            var qtyBd = cartDetail.qty
            cartDetail.update({
                qty: qtyBd + qty
            })
            return res.status(200).json('ok')
        } else {
            var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty ,UserIdBuyer: req.user.id });
        }

        return res.status(200).json('ok')
    } else {
        var cart = await models.carts.create({ UserIdSaler: UserIdSaler, UserIdBuyer: req.user.id });
        cart.save()
        var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id });
        cart_detail.save()
    }
    return res.status(200).json(wishesFind)
})


router.post('/addCartCustomer', async (req, res) => {
    var { carts } = req.body
    console.log(carts)
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    // console.log('sdaaaaaaaaaaaaa')
    // console.log(qty)
    // const wishesFind = await models.carts.findOne({
    //     where: { UserId: req.user.id, ProductId: ProductId }
    // })
    // if (wishesFind) {
    //     wishesFind.update({
    //         qty: qty
    //     })
    // } else {
    //     var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id, qty: qty });
    //     cart.save()
    // }
    return res.status(200).json('ok')
})

router.post('/changeQty', async (req, res) => {
    var { ProductId, qty } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log('sdaaaaaaaaaaaaa')
    console.log(qty)
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

router.post('/deleteCart', async (req, res) => {
    var { ProductId, qty } = req.body
    // var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id });
    // cart.save()
    console.log('sdaaaaaaaaaaaaa')
    console.log(req.body)
    const wishesFind = await models.cart_details.findOne({
        where: { UserIdBuyer: req.user.id, ProductId: ProductId }
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
    var anhquy 
    if (req.user) {
        await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler','UserIdBuyer'],
            // include:[{
            //     model: models.cart_details,
            //     as: 'cart_details',
            //     where: { id: req.user.id },
            // }]
            // include: [{
            //     model: models.users,
            //     as: 'users',
            //     required: false,
            //     where: { id: req.user.id },
            //     // Pass in the Product attributes that you want to retrieve
            //     attributes: ['id', 'name'],
            //     through: {
            //         // This block of code allows you to retrieve the properties of the join table
            //         model: models.carts,
            //         as: 'carts',
            //     }
            // }, { model: models.users }]
        }).then(function (projects) {

             anhquy = projects
        })
        var hahha
        hahha = [1, 2, 3, 4, 5]
        var anhquy = await models.carts.findAll({
            where: { UserIdBuyer: anhquy.UserIdBuyer },
            include: [{
                model: models.cart_details,
                as: 'cart_details',
                where: { UserIdBuyer: anhquy.UserIdBuyer },
                include:[{
                    model: models.products,
                    as: 'HomeTeam'
                }]
            },{
                model: models.users,  
            }]
        })
        return res.json(anhquy)
    } else {
        carts = []
    }

})

router.get('/checkout', async (req, res) => {
    var carts
    if (req.user) {
        provinces = await models.provinces.findAll({})
        districts = await models.districts.findAll({})
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
            }, { model: models.users }]
        })
    } else {
        carts = []
        provinces = []
        districts = []
    }
    return res.send({ carts: carts, provinces: provinces, districts: districts })
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