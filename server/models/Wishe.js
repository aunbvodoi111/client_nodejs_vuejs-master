'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wishe = sequelize.define('wishes', {
    view: DataTypes.INTEGER,
    mass: DataTypes.INTEGER,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Wishe.associate = function(models) {
    // models.Product.belongsTo(models.Cate, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Wishe;
};