'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_notis = sequelize.define('product__notis', {
    content: DataTypes.STRING,
    status: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
  Product_notis.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Comment.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
    Product_notis.belongsTo(models.users,{ as:'user',foreignKey: 'UserId'})
    Product_notis.belongsTo(models.products,{ as:'product',foreignKey: 'ProductId'})
    
  };
  return Product_notis;
};