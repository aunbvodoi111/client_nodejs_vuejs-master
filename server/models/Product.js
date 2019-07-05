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
    Product.hasMany(models.comments,{ as: 'comments', foreignKey: 'ProductId'})
    Product.belongsTo(models.users, {foreignKey: 'UserId'});
    // Product.belongsToMany(models.users, {  
    //   as: 'users',
    //   through: 'carts',
    //   foreignKey: 'ProductId',
    //   otherKey: 'UserId'
    // });
    Product.belongsToMany(models.users, {  
      as: 'userlike',
      through: 'wishes',
      foreignKey: 'ProductId',
      otherKey: 'UserId'
    });
    // User.belongsToMany(models.products, { as: 'products', through: 'carts', foreignKey: 'UserId', otherKey: 'ProductId'})
  };
  return Product;
};