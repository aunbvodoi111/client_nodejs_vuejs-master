'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    keyword: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    
    view: DataTypes.INTEGER,
    mass: DataTypes.INTEGER,
    khuyenmai: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Product.associate = function (models) {
    Product.hasMany(models.ratings,{ as: 'ratings', foreignKey: 'ProductId'})
    Product.belongsTo(models.users, {foreignKey: 'UserId'});
  };
  return Product;
};