'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('addresses', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Address.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Comment.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
  };
  return Address;
};