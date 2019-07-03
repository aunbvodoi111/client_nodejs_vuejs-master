'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customers', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    UserIdSaler: DataTypes.INTEGER,
    UserIdBuyer: DataTypes.INTEGER,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Customer.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Customer.belongsTo(models.users, {
    //   as: "UserIdSaler",
    //   onDelete: "cascade",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Customer.belongsTo(models.users, {
    //   as: 'UserIdSaler',
    //   foreignKey: 'UserIdSaler'
    // });

    // Customer.belongsTo(models.users, {
    //   as: 'UserIdBuyer',
    //   foreignKey: 'UserIdBuyer'
    // })
    // Customer.belongsTo(models.users, {
    //   as: "UserIdBuyer",
    //   onDelete: "cascade",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Customer;
};