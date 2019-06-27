'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('bills', {
    name: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    date_order: DataTypes.DATE,
    note: DataTypes.STRING,
    sum: DataTypes.INTEGER,
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
  };
  return Bill;
};