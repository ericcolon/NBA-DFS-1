export default (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  View.associate = (models) => {
    View.belongsTo(models.Post);
    View.belongsTo(models.User);
  }
  return View;
}
