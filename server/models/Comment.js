'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
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
    Comment.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
  };
  return Comment;
};