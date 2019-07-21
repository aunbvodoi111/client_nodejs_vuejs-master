const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');


router.get('/productUser', async (req, res) => {
    
    if (req.user) {
        var anhquy = await models.products.findAll({
            where: { UserId : req.user.id },
        })
        return res.json(anhquy)
    } else {
        carts = []
    }
    return res.json('ok')
})

router.post('/productShop', async (req, res) => {
    var { id } = req.body
    if (req.user) {
        var anhquy = await models.products.findAll({
            where: { UserId : id },
        })
        return res.json(anhquy)
    } else {
        carts = []
    }
    return res.json('ok')
})
module.exports = router;