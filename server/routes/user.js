const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');

router.get('/listProductWish', async (req, res) => {
    var carts
    if (req.user) {
        carts = await models.products.findAll({
            include: [{
                model: models.users,
                as: 'userlike',
                required: false,
                where: { id: req.user.id },
                // Pass in the Product attributes that you want to retrieve
                attributes: ['id', 'name'],
                through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: models.wishes,
                    as: 'wishes',
                }
            }, { model: models.users }]
        })
    } else {
        carts = []
    }
    return res.json(carts)
})

router.get('/listRating', async (req, res) => {
    var carts
    if (req.user) {
        carts = await models.ratings.findAll({
            where: { UserId: req.user.id },
            include: [{
                model: models.products,
            }]
        })
    } else {
        carts = []
    }
    return res.json(carts)
})

router.get('/address', async (req, res) => {
    var provinces = await models.provinces.findAll({})
    var districts = await models.districts.findAll({}) 
    var addresss = await models.addresses.findAll({
        include: [{
            model: models.districts,
            as: 'district'
        }],
        include: [{
            model: models.provinces,
            as: 'province'
        }]
    })
    return res.send({ provinces: provinces , districts : districts, addresss : addresss})
})


router.get('/listFollow', async (req, res) => {
    if (req.user) {
        var follows = await models.follows.findAll({
            where: {
                [Op.or]: [
                    { UserId: req.user.id },
                ]
            },
            include: [{
                model: models.users
            }]
        });
    }
    return res.json(follows)
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
    }
    return res.json(carts)
})

router.get('/checkout', async (req, res) => {
    var carts, provinces, districts
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