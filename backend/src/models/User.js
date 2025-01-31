const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      defaultValue: "employee",
    },
    employeeId: {
      type:DataTypes.UUID,
      allowNull: true,  // 
      references: {
        model: "Employees",
        key: "id",
      },
    },
  });
};
