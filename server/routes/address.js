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
    var { phone, name, ProvinceId, DistrictId, address } = req.body
    console.log(req.body)
    var findAddress = await models.addresses.findOne({
        where: { [Op.or]: [{ UserId: req.user.id }, { checkAddress: 1 }] },
    })

    if (findAddress) {
        findAddress.update({
            checkAddress: 0
        })
        var addresseNew = await models.addresses.create({
            phone: phone,
            UserId: req.user.id,
            name: name,
            address: address,
            ProvinceId: ProvinceId,
            DistrictId: DistrictId,
            checkAddress: 1
        });
        addresseNew.save()
        addresses = await models.addresses.findOne({
            where: { id: addresseNew.id },
            include: [{
                model: models.districts,
                as: 'district'
            }, {
                model: models.provinces,
                as: 'province'
            }]
        })
        return res.status(200).json(addresses)
    } else {
        var addresseNew = await models.addresses.create({
            phone: phone,
            UserId: req.user.id,
            name: name,
            address: address,
            ProvinceId: ProvinceId,
            DistrictId: DistrictId,
            checkAddress: 1
        });
        addresseNew.save()
        addresses = await models.addresses.findOne({
            where: { id: addresseNew.id },
            include: [{
                model: models.districts,
                as: 'district'
            }, {
                model: models.provinces,
                as: 'province'
            }]
        })
        return res.status(200).json(addresses)
    }

})

router.get('/', async (req, res) => {
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
            }]
        })
    } else {
        carts = []
    }
    return res.json(carts)
})

router.post('/edit', async (req, res) => {
    var { id } = req.body
    var addresse
    if (req.user) {
        addresse = await models.addresses.findOne({
            where: { id: id }
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
            // }]
        })
    } else {
        addresse = {}
    }
    return res.json(addresse)
})

router.post('/changeAddressDefault', async (req, res) => {
    var { id } = req.body
    var addresse
    if (req.user) {
        var findAddress = await models.addresses.findOne({
            where: { [Op.and]: [{ UserId: req.user.id }, { checkAddress: 1 }] },
        })
        if( findAddress ){
            console.log('okem')
            findAddress.update({
                checkAddress : 0
            })
            addresse = await models.addresses.findOne({
                where: { id: id }
            })
            await addresse.update({
                checkAddress : 1,
            }).then(function (address) {
                return res.json(address)
            })
        }else{
            console.log('okem nhe')
            addresse = await models.addresses.findOne({
                where: { id: id }
            })
            await addresse.update({
                checkAddress : 1,
            }).then(function (address) {
                return res.json(address)
            })
        }
        
    } else {
        addresse = {}
    }
    return res.json(addresse)
})



router.post('/editAddress', async (req, res) => {
    var { id, name, phone, ProvinceId, DistrictId, address } = req.body
    var addresses
    if (req.user) {
        addresses = await models.addresses.findOne({
            where: { id: id }
        })
        addresses.update({
            name: name,
            phone: phone,
            ProvinceId: ProvinceId,
            DistrictId: DistrictId,
            address: address
        }).then(function (address) {
            return res.json(address)
        })
    } else {
        addresses = {}
    }
    return res.json(addresses)
})
module.exports = router;