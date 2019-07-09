'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rep_rating = sequelize.define('rep_ratings', {
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    RatingId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Rep_rating.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Rep_rating.belongsTo(models.users, {foreignKey: 'UserId'});
  };
  return Rep_rating;
};