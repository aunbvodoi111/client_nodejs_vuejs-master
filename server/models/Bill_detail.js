'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill_detail = sequelize.define('bill_details', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.INTEGER,
    soluong: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Bill_detail.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Bill_detail;
};