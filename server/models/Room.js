'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('rooms', {
    name: DataTypes.STRING,
    UserId1: DataTypes.UUID,
    UserId2: DataTypes.UUID,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Room.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Room.belongsTo(models.users, {foreignKey: 'UserId1'});
    Room.belongsTo(models.users, {foreignKey: 'UserId2'});
  };
  return Room;
};