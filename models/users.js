var bcrypt = require('bcrypt-nodejs');
// this is making the users table

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    firstname: { type: Sequelize.STRING, notEmpty: true },
    lastname: { type: Sequelize.STRING, notEmpty: true },
    username: { type: Sequelize.TEXT },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    password: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
  }

  return User;
};
