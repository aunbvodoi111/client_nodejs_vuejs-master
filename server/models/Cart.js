'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('carts', {
    UserIdBuyer: DataTypes.UUID,
    UserIdSaler: DataTypes.UUID,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Cart.associate = function(models) {
    // Cart.belongsTo(models.products,{foreignKey: 'ProductId'})
    // Cart.belongsTo(models.users, {foreignKey: 'UserId'});
    Cart.hasMany(models.cart_details,{ as: 'cart_details', sourceKey: 'UserIdSaler', foreignKey: 'UserIdSaler'})
    Cart.belongsTo(models.users, {foreignKey: 'UserIdSaler'});
    // Cart.hasMany(models.cart_details,{ as: 'cart_details', sourceKey: 'UserIdBuyer', foreignKey: 'UserIdBuyer'})
  };
  return Cart;
};

