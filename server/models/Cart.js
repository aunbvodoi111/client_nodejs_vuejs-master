'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('carts', {
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Cart.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Cart;
};