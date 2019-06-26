'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Comment.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Comment;
};