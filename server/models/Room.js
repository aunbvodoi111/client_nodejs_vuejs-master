'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('rooms', {
    name: DataTypes.STRING,
    UserName1: DataTypes.STRING,
    UserName2: DataTypes.STRING,
    updated : DataTypes.INTEGER
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Room.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Room.hasMany(models.messagers, { as: 'messagers', foreignKey: 'RoomId' })
    Room.hasOne(models.users, {
      as: 'user1', foreignKey: 'id', sourceKey: 'UserName1'
    });
    Room.hasOne(models.users, {
      as: 'user2', foreignKey: 'id', sourceKey: 'UserName2'
    });
  };
  return Room;
};