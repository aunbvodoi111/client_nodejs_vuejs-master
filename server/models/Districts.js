'use strict';
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('districts', {
    name: DataTypes.STRING,
    ProvinceId: DataTypes.UUID,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  District.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return District;
};