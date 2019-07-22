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
    var { ProductId, title , star , image , content } = req.body
    var ratingNew = await models.ratings.create({ ProductId: ProductId, UserId: req.user.id,  name: req.user.name,title: title, star: star, image: image, content: content });
    ratingNew.save()
    return res.status(200).json(ratingNew)
})
router.post('/add_reprating', async (req, res) => {
    var { RatingId, image , content } = req.body
    var rep_ratingsNew = await models.rep_ratings.create({ RatingId: RatingId, UserId: req.user.id,  image: image, content: content });
    rep_ratingsNew.save()
    return res.status(200).json('ok')
})

module.exports = router;
