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
    var { ProductId, qty, UserIdSaler, ClassifyId } = req.body
    console.log(req.body)
    var classifyFind = await models.classifies.findOne({ where: { id: ClassifyId } });
    // cart.save()
    console.log(req.body)
    var cart_detail
    const wishesFind = await models.carts.findOne({
        where: {
            [Op.and]:
                [{ UserIdBuyer: req.user.id }, { UserIdSaler: UserIdSaler }]
        }
    })
    if (classifyFind) {
        console.log('đã tìm dc chưa ')
        if (wishesFind) {
            const cartDetail = await models.cart_details.findOne({
                where: {
                    [Op.and]:
                        [{ ProductId: ProductId }, { UserIdBuyer: req.user.id }, { ClassifyId: classifyFind.id }]
                }
            })
            if (cartDetail) {
                var qtyBd = cartDetail.qty
                cartDetail.update({
                    qty: qtyBd + qty
                })
                return res.status(200).json(cartDetail)
            } else {
                var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id, CartId: wishesFind.id, ClassifyId: classifyFind.id });
                return res.status(200).json(cart_detail)
            }
        } else {
            var cart = await models.carts.create({ UserIdSaler: UserIdSaler, UserIdBuyer: req.user.id });
            cart.save()
            cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id, CartId: cart.id });
            cart_detail.save()
        }

    } else {
        if (wishesFind) {
            const cartDetail = await models.cart_details.findOne({
                where: {
                    [Op.and]:
                        [{ ProductId: ProductId }, { UserIdBuyer: req.user.id }]
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
                var cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id, CartId: wishesFind.id });
                return res.status(200).json(cart_detail)
            }
        } else {
            var cart = await models.carts.create({ UserIdSaler: UserIdSaler, UserIdBuyer: req.user.id });
            cart.save()
            cart_detail = await models.cart_details.create({ UserIdSaler: UserIdSaler, ProductId: ProductId, qty: qty, UserIdBuyer: req.user.id, CartId: cart.id });
            cart_detail.save()
        }
    }
    return res.status(200).json(cart_detail)
})


router.post('/addCartCustomer', async (req, res) => {
    var { carts, AddressId } = req.body
    console.log(carts)
    var listUser = []
    for (var i = 0; i < carts.length; i++) {
        var bills = await models.bills.create({
            UserIdBuyer: carts[i].UserIdBuyer,
            UserIdSaler: carts[i].UserIdSaler,
            sum: 0,
            note: carts[i].note,
            AddressId: AddressId,
            date_order: '30/1/2019',
            payment: 1,
        });
        bills.save()
        var idNotifj = await models.notifications.create({
            BillId: bills.id,
            UserIdSaler: bills.UserIdSaler,
            UserIdBuyer: bills.UserIdBuyer,
            title : 'Đơn hàng mới',
            content: 'đã đặt một đơn hàng  . Vui lòng liên hệ với người mua để biết thông tin',
            status : 1 
        })
        
        var product__notis = await models.notifications.findOne({
            where :{ id : idNotifj.id },
            include:[{
                model: models.users,
                as:'userBy'
            },{
                model: models.users,
                as:'user'
            }]
        })
        
        listUser.push(product__notis)
        var sum = 0
        for (var j = 0; j < carts[i].cart_details.length; j++) {
            if( carts[i].cart_details[j].classifies == null ){
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
                var product = await models.products.findOne({ 
                    where: { id: carts[i].cart_details[j].ProductId },
                    include:[{
                        model : models.users
                    }]
                 })
                var qty = product.qty
                product.update({
                    qty: qty - carts[i].cart_details[j].qty
                })
                
                if(product.qty == 0){
                    console.log('chay dc vao day k ')
                    var id = await models.product__notis.create({
                        content : 'vui lòng  bổ sung thêm hàng hoặc đăng sản phẩm mới .',
                        ProductId : product.id,
                        UserId : carts[i].cart_details[j].UserIdSaler,
                        status : 1
                    })
                    var product__notis = await models.product__notis.findOne({
                        where :{ id : id.id },
                        include:[{
                            model: models.users,
                            as:'user'
                        },{
                            model: models.products,
                            as:'product'
                        }]
                    })
                    listUser.push(product__notis)
                }
                
                sum = sum + carts[i].cart_details[j].HomeTeam.discount * carts[i].cart_details[j].qty;
            }else{
                var bill_details = await models.bill_details.create({
                    UserIdBuyer: carts[i].cart_details[j].UserIdBuyer,
                    UserIdSaler: carts[i].cart_details[j].UserIdSaler,
                    Product_Id: carts[i].cart_details[j].ProductId,
                    BillId: bills.id,
                    note: carts[i].note,
                    image: carts[i].cart_details[j].HomeTeam.image,
                    qty: carts[i].cart_details[j].qty,
                    ClassifyId : carts[i].cart_details[j].classifies.id,
                    price: carts[i].cart_details[j].classifies.price,
                    content: 1,
                    name: 'anqnh',
                });
    
                bill_details.save()
                var classify = await models.classifies.findOne({ where: { id: carts[i].cart_details[j].classifies.id } })
                var qty = classify.qty
                await classify.update({
                    qty: qty - carts[i].cart_details[j].qty
                })
                listUser.push(product)
                if(classify.qty == 0){
                    await models.product__notis.create({
                        content : 'vui lòng  bổ sung thêm hàng hoặc đăng sản phẩm mới .',
                        ProductId : product.id,
                        UserId : carts[i].cart_details[j].UserIdSaler,
                        status : 1
                    })
                }
                sum = sum + carts[i].cart_details[j].classifies.price * carts[i].cart_details[j].qty;
            }
        }
        const wishesFind = await models.bills.findOne({
            where: { id: bills.id }
        })

        if (wishesFind) {
            wishesFind.update({
                sum: sum
            })
        }
    }

    for (var i = 0; i < carts.length; i++) {
        await models.carts.destroy({ where: { id: carts[i].id } })
    }

    await models.date_orders.create({
        BillId: bills.id
    })
    return res.status(200).send({ listUser : listUser , bill_details : bill_details })

})

router.post('/changeQty', async (req, res) => {
    var { ProductId, qty, ClassifyId } = req.body
    console.log(req.body)

    if (ClassifyId) {
        const wishesFind = await models.cart_details.findOne({
            where: { UserIdBuyer: req.user.id, ProductId: ProductId , ClassifyId : ClassifyId }
        })
        if (wishesFind) {
            wishesFind.update({
                qty: qty
            })
        } else {
            var cart = await models.carts.create({ ProductId: ProductId, UserId: req.user.id, qty: qty });
            cart.save()
        }
    } else {
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

router.post('/changeClassify', async (req, res) => {
    var { id , ProductId } = req.body
    console.log(req.body)
    var classify = await models.classifies.findOne({ 
        where: { id: id },
     })

     var cart_detail = await models.cart_details.findOne({ 
        where: { ProductId: ProductId , UserIdBuyer : req.user.id },
     })

    if (cart_detail) {
        cart_detail.update({
            ClassifyId : id
        })
    }
    return res.status(200).json(classify)
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
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: models.cart_details,
                    as: 'cart_details',
                    where: { UserIdBuyer: findCart.UserIdBuyer },
                    include: [{
                        model: models.products,
                        as: 'HomeTeam',
                        include: [{
                            model: models.classifies,
                            as: 'classifies',
                        }]
                    },{
                        model: models.classifies,
                        as: 'classifies',
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
    var addresss
    if (req.user) {
        var provinces = await models.provinces.findAll({})
        var districts = await models.districts.findAll({})
        addresss = await models.addresses.findAll({
            where :{UserId : req.user.id},
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.districts,
                as: 'district'
            }, {
                model: models.provinces,
                as: 'province'
            }]
        })

        await models.carts.findOne({
            where: { UserIdBuyer: req.user.id },
            attributes: ['UserIdSaler', 'UserIdBuyer'],
        }).then(function (projects) {
           anhquy = projects
        })

        carts = await models.carts.findAll({
            where: { UserIdBuyer: anhquy.UserIdBuyer },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.cart_details,
                as: 'cart_details',
                where: {
                    [Op.and]:
                        [{ UserIdBuyer: anhquy.UserIdBuyer }, { checkBuy: 1 }]
                },
                include: [{
                    model: models.products,
                    as: 'HomeTeam',
                    where: { qty: { [Op.gt]: 0 } },
                    include: [{
                        model: models.classifies,
                        as: 'classifies',
                        // where: { qty: { [Op.gt]: 0 } },
                    }]
                }, {
                    model: models.classifies,
                    as: 'classifies',
                    [Op.or]: [
                        {
                          ProductId: {
                            [Op.eq]: 0
                          }
                        },
                        {
                            qty: {
                            [Op.gt]: 0
                          }
                        }
                      ]
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
            }, {
                model: models.provinces,
                as: 'province'
            }]
        }]
    })
    return res.send({ carts: carts, provinces: provinces, districts: districts, users: users , addresss : addresss })
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