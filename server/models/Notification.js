'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notifications', {
    name: DataTypes.STRING,
    keyword: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    view: DataTypes.INTEGER,
    mass: DataTypes.INTEGER,
    khuyenmai: DataTypes.STRING,
    qty: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Notification.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Notification;
};