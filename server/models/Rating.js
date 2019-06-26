'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('ratings', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    star: DataTypes.INTEGER,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Rating.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Rating;
};