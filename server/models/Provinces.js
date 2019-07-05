'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('provinces', {
    // province_id	: DataTypes.INTEGER,
    province_name	: DataTypes.STRING,
  });
  Province.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Province;
};