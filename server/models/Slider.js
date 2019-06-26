'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slider = sequelize.define('sliders', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Slider.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Slider;
};