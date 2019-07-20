'use strict';
module.exports = (sequelize, DataTypes) => {
  const Action_notis = sequelize.define('action__notis', {
    content: DataTypes.STRING,
    status: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserIdSaler: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
    Action_notis.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Comment.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
    // Action_notis.hasOne(models.districts, {
    //   as: 'district', foreignKey: 'id', sourceKey: 'DistrictId'
    // });
    // Action_notis.hasOne(models.provinces, {
    //   as: 'province', foreignKey: 'id', sourceKey: 'ProvinceId'
    // });
  };
  return Action_notis;
};