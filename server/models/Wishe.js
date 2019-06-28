'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wishe = sequelize.define('wishes', {
    ProductId: DataTypes.UUID,
    UserId: DataTypes.UUID,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Wishe.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Wishe;
};