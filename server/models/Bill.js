'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('bills', {
    name: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    date_order: DataTypes.DATE,
    note: DataTypes.STRING,
    sum: DataTypes.INTEGER,
    UserIdBuyer: DataTypes.UUID,
    UserIdSaler: DataTypes.UUID,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Bill.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Bill.hasMany(models.bill_details,{ as: 'bill_details',foreignKey: 'BillId'})
    Bill.belongsTo(models.users, {foreignKey: 'UserIdSaler'});
  };
  return Bill;
};