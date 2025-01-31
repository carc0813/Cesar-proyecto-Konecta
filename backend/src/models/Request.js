const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Request", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    resumen: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_empleado: {
      type: DataTypes.UUID,
      references: {
        model: "Employees", // Nombre de la tabla
        key: "id", // Clave primaria
      },
      allowNull: false,
    },
  });
};
