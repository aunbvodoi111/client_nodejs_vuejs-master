'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill_detail = sequelize.define('bill_details', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
    Product_Id: DataTypes.UUID,
    BillId: DataTypes.UUID,
    status: DataTypes.INTEGER,
    UserIdBuyer: DataTypes.UUID,
    UserIdSaler: DataTypes.UUID,
    ClassifyId: DataTypes.INTEGER
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Bill_detail.associate = function (models) {
    Bill_detail.hasMany(models.billOrder, { as: 'dateOrder', foreignKey: 'BillDetailId' })
    Bill_detail.belongsTo(models.users, {
      foreignKey: 'UserIdSaler',
    });
    Bill_detail.belongsTo(models.bills, {
      foreignKey: 'UserIdSaler', onDelete: "CASCADE"
    });
    Bill_detail.hasOne(models.classifies, {
      as: 'classifies', foreignKey: 'id', sourceKey: 'ClassifyId'
    });
    Bill_detail.hasOne(models.products, {
      as: 'product', foreignKey: 'id', sourceKey: 'Product_Id'
    });
  };
  return Bill_detail;
};