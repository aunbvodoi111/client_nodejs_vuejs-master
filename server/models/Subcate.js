'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subcate = sequelize.define('subcates', {
    name: DataTypes.STRING,
    keyword: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Subcate.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Subcate.hasMany(models.products,{ as: 'products', foreignKey: 'SubcateId'})
  };
  return Subcate;
};