export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VoteTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Vote.associate = (models) => {
    Vote.belongsTo(models.Post);
    Vote.belongsTo(models.User);
    Vote.belongsTo(models.VoteType);
  }
  return Vote;
}
