'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('carts', {
    ProductId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    qty: DataTypes.INTEGER,
    checkBuy: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.products,{foreignKey: 'ProductId'})
    Cart.belongsTo(models.users, {foreignKey: 'UserId'});
    
  };
  return Cart;
};