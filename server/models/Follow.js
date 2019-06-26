'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follows', {
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Follow.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Follow;
};