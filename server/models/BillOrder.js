'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillOrder = sequelize.define('billOrder', {
    name: DataTypes.STRING,
    data: DataTypes.DATE                        ,
    BillId : DataTypes.UUID,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
    BillOrder.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return BillOrder;
};