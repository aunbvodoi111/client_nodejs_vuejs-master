'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('ratings', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    star: DataTypes.INTEGER,
    image: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Rating.associate = function(models) {
    Rating.hasMany(models.rep_ratings,{ as: 'rep_ratings', foreignKey: 'RatingId'})
    Rating.belongsTo(models.products, {foreignKey: 'ProductId'});
    Rating.belongsTo(models.users, {foreignKey: 'UserId'});
  };
  return Rating;
};