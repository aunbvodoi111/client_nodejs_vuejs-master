'use strict';
module.exports = (sequelize, DataTypes) => {
  const Date_orders = sequelize.define('date_orders', {
    BillId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });
    Date_orders.associate = function (models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    // Comment.hasMany(models.rep_comments,{ as: 'req_comments', foreignKey: 'CommentId'})
    // Address.hasOne(models.districts, {
    //   as: 'district', foreignKey: 'id', sourceKey: 'DistrictId'
    // });
    // Address.hasOne(models.provinces, {
    //   as: 'province', foreignKey: 'id', sourceKey: 'ProvinceId'
    // });
  };
  return Date_orders;
};