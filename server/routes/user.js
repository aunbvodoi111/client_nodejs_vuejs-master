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
            },
             { model: models.users },
             { model: models.ratings,
               as:'ratings'
             }
            ]
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

router.post('/edit', async (req, res) => {
    var { avatar, day , month , year, gender } = req.body
    var users = await models.users.findOne({ where : {id : req.user.id }})
    // users.set('updatedAt', new Date()) 
    users.update({
        avatar : avatar,
        day : day,
        month : month,
        year : year,
        gender : gender
      });
    users.save().then( user =>{
        return res.json(user)
    })
    
})

router.get('/update', async (req, res) => {
    var users = await models.users.findOne({ where : {id : 2}})
    // users.set('updatedAt', new Date())
    var start = new Date();
    users.update({
        phone : 2
      });
    users.save()
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh'
      });
      
      console.log(nDate);
    var date = new Date() - start
    return res.json({date : date,user : users})
})
router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/address', async (req, res) => {
    var provinces = await models.provinces.findAll({})
    var districts = await models.districts.findAll({}) 
    var  addresss = await models.addresses.findAll({
        where :{ UserId : req.user.id },
        include: [{
            model: models.districts,
            as: 'district'
        },{
            model: models.provinces,
            as: 'province'
        }]
    })
    return res.send({ provinces: provinces , districts : districts , addresss : addresss})
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



module.exports = router;