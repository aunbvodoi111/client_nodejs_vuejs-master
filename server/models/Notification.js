'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notifications', {
    content: DataTypes.STRING,
    UserIdSaler: DataTypes.INTEGER,
    UserIdBuyer: DataTypes.INTEGER,
    BillId: DataTypes.INTEGER,
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
    Notification.belongsTo(models.users, {as:'userBy',foreignKey: 'UserIdBuyer'});
    Notification.belongsTo(models.users, {as:'userSl',foreignKey: 'UserIdSaler'}); 
  };
  return Notification;
};