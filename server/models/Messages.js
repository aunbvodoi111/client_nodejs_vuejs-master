'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('messagers', {
    content: DataTypes.STRING,
    RoomId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    avatar: DataTypes.STRING,
    sum: DataTypes.INTEGER,
    BillId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    image: DataTypes.STRING,
    isRead : DataTypes.BOOLEAN                     
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Messages.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Messages.belongsTo(models.users, { foreignKey: 'UserId' })
    Messages.hasOne(models.products, {
      as: 'product', foreignKey: 'id', sourceKey: 'ProductId'
    });
    Messages.hasOne(models.bills, {
      as: 'bill', foreignKey: 'id', sourceKey: 'BillId'
    });
    // Messages.hasOne(models.users, {
    //   as: 'user', foreignKey: 'id', sourceKey: 'UserId'
    // });
  };
  return Messages;
};