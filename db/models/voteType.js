export default (sequelize, DataTypes) => {
  const VoteType = sequelize.define('VoteType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  VoteType.associate = (models) => {
    VoteType.hasMany(models.Vote);
  }
  return VoteType;
};
