'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  User.associate = function (models) {
    // User.hasMany(models.carts,{ as: 'carts', foreignKey: 'UserId'})
    // User.hasMany(models.customer);
    // User.hasMany(models.customers);
  
    // User.hasMany(models.customers, {
    //   as: "sd",
    User.hasMany(models.products,{ as: 'products', foreignKey: 'UserId'})
    User.hasMany(models.addresses,{ as: 'addresses', foreignKey: 'UserId'})
    // });
    // User.hasMany(models.customers,{ as: 'UserIdSaler', foreignKey: 'UserIdSaler'})
    // User.hasMany(models.customers,{ as: 'UserIdBuyer', foreignKey: 'UserIdBuyer'})
    // // User.hasMany(models.customers, {
    // //   as: "customers",
    // //   foreignKey: 'UserIdBuyer',
    // // });
    // User.hasMany(models.products, { as: 'productss', foreignKey: 'UserId' })
    // User.belongsToMany(models.products, {
    //   as: 'products',
    //   through: 'carts',
    //   otherKey: 'UserId',
    //   foreignKey: 'ProductId',
    // });
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
