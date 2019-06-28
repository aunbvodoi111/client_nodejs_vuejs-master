'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  User.associate = function(models) {
    // User.hasMany(models.carts,{ as: 'carts', foreignKey: 'UserId'})
    User.hasMany(models.products,{ as: 'productss', foreignKey: 'UserId'})
    User.belongsToMany(models.products, {  
      as: 'products',
      through: 'carts', 
      otherKey: 'UserId',
      foreignKey: 'ProductId',
    });
    // User.belongsToMany(models.products, {
    //   through: 'carts',
    //   as: 'products',
    //   foreignKey: 'UserId',
    //   otherKey: 'ProductId'
    // });ProductId
    // User.belongsToMany(models.products, { as: 'products', through: 'carts', foreignKey: 'UserId', otherKey: 'ProductId'})
    // User.belongsToMany(models.products, { through: 'carts' })
  };
  return User;
};