'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('messagers', {
    content: DataTypes.STRING,
    RoomId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    avatar: DataTypes.STRING,
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