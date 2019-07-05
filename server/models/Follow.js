'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follows', {
    ProductId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    UserIdFollow: DataTypes.UUID,
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
    Follow.belongsTo(models.users, {foreignKey: 'UserIdFollow'});
  };
  return Follow;
};