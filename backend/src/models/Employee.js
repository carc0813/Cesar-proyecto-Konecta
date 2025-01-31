const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Employee", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salario: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  });
};
