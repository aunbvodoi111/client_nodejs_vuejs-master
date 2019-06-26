'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('rooms', {
    name: DataTypes.STRING,

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
  };
  return Room;
};