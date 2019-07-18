'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classify = sequelize.define('classifies', {
    name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Classify.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // // });
    // Classify.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
  };
  return Classify;
};