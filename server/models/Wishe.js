'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    view: DataTypes.INTEGER,
    mass: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Product.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Product;
};