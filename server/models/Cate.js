'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cate = sequelize.define('cates', {
    name: DataTypes.STRING,
    keyword: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Cate.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Cate;
};