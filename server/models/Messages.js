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
    image : DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Messages.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Messages.belongsTo(models.users,{ foreignKey: 'UserId'})
  };
  return Messages;
};