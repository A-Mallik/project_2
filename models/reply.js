//objects instead of sql queries for  sequeeelize
module.exports = function(sequelize, DataTypes) {
  var Reply = sequelize.define("Reply", {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //     //string is like varchar
    //   }
    // },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
      //text allows an almost unlimited size
    }
  });

  Reply.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Reply.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Reply.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Reply.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reply;
};
