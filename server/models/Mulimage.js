'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mulimage = sequelize.define('mulimages', {
    image: DataTypes.STRING,
    ProductId : DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Mulimage.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Mulimage;
};