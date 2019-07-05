'use strict';
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('districts', {
    district_name: DataTypes.STRING,
    province_id: DataTypes.UUID,
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