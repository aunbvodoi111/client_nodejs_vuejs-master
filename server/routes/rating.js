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
    var { ProductId, title, star, image, content } = req.body
    var ratingNew = await models.ratings.create({ ProductId: ProductId, UserId: req.user.id, name: req.user.name, title: title, star: star, image: image, content: content });
    ratingNew.save()
    return res.status(200).json(ratingNew)
})
router.post('/add_reprating', async (req, res) => {
    var { RatingId, image, content } = req.body
    var rep_ratingsNew = await models.rep_ratings.create({ RatingId: RatingId, UserId: req.user.id, image: image, content: content });
    rep_ratingsNew.save()
    return res.status(200).json('ok')
})
router.get('/buyer/:id', async (req, res) => {
    var { id } = req.params
    var listRating = await models.ratings.findAll({
        include: [{
            where: { UserId: id },
            model: models.products,
        },
        { model: models.users }
        ]
    })
    return res.status(200).json(listRating)
})


router.post('/filterRatingBuyer', async (req, res) => {
    var { UserId, value } = req.body
    if (value < 6) {
        var listRating = await models.ratings.findAll({
            where:
                { star: value }
            ,
            include: [{
                where: { UserId: UserId },
                model: models.products,
            },
            { model: models.users }
            ]
        })
    } else if (value == 7) {
        var listRating = await models.ratings.findAll({
            include: [{
                where: { UserId: UserId },
                model: models.products,
            },
            { model: models.users }
            ]
        })
    }
    return res.status(200).json(listRating)
})

router.post('/filterRating', async (req, res) => {
    var { ProductId, value } = req.body
    console.log(req.body)
    if (value < 6) {
        var listRating = await models.ratings.findAll({
            where: {
                [Op.and]:
                    [{ star: value }, { ProductId: ProductId }]
            },
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }
    else if (value == 7) {
        var listRating = await models.ratings.findAll({
            where: {
                ProductId: ProductId
            },
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }
    else if (value == 8) {
        var listRating = await models.ratings.findAll({
            where:{
                [Op.and]:
                    [{ ProductId: ProductId }, { image: {[Op.ne]: "" } 
                }]
            },
            include: [{
                model: models.rep_ratings,
                as: 'rep_ratings',
                
                include: [{
                    model: models.users,
                }]
            },
            { model: models.users }
            ]
        })
    }
    // else if (value == 9) {
    //     var listRating = await models.ratings.findAll({
    //         where: {
    //             ProductId: ProductId
    //         },
    //         include: [{
    //             model: models.rep_ratings,
    //             as: 'rep_ratings',
    //             include: [{
    //                 model: models.users,
    //             }]
    //         },
    //         { model: models.users }
    //         ]
    //     })
    //     var isCheck = listRating.filters(ratings => ratings.rep_ratings.lemh)
    //     if( listRating.rep_ratings ){
    //         return res.status(200).json(listRating)
    //     }else{
    //         listRating = []
    //         return res.status(200).json(listRating)
    //     }
    // }
    return res.status(200).json(listRating)
})


module.exports = router;