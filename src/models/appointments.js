// models/Appointment.js

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    meeting: DataTypes.STRING,
    location: DataTypes.STRING,
    service: DataTypes.STRING,
  });

  return Appointment;
};
