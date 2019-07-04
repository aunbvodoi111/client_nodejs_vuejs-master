'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rep_comment = sequelize.define('rep_comments', {
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    CommentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Rep_comment.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Rep_comment;
};