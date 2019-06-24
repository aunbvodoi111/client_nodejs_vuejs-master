'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    keyword: DataTypes.STRING,
    thongsokithuat: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    view: DataTypes.INTEGER,
    noibat: DataTypes.INTEGER,
    khuyenmai: DataTypes.STRING,
    soluong: DataTypes.STRING,
    image: DataTypes.STRING,
    soluong: DataTypes.STRING,
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