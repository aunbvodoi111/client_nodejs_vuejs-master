'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cart_detail = sequelize.define('cart_details', {
        qty: DataTypes.INTEGER,
        checkBuy: DataTypes.STRING,
        ProductId: DataTypes.UUID,
        UserIdSaler: DataTypes.UUID,
        UserIdBuyer: DataTypes.UUID,
        CartId: DataTypes.UUID,
    }, {
            updatedAt: 'updated_at',
            createdAt: 'created_at'
        });
    Cart_detail.associate = function (models) {
        // Cart_detail.belongsTo(models.products,{foreignKey: 'ProductId'})
        // Cart_detail.belongsTo(models.users, {foreignKey: 'UserId'});
        Cart_detail.belongsTo(models.carts, {
            foreignKey: 'UserIdSaler', onDelete: "CASCADE"
        });
        Cart_detail.hasOne(models.products, {
            as: 'HomeTeam', foreignKey: 'id', sourceKey: 'ProductId'
        });
        Cart_detail.belongsTo(models.carts, {
            foreignKey: 'UserIdSaler', onDelete: "CASCADE"
        });
    };
    return Cart_detail;
}; 