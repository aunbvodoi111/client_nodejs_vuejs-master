'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('provinces', {
    // province_id	: DataTypes.INTEGER,
    name	: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
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