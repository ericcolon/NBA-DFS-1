export default (sequelize, DataTypes) => {
  const PostType = sequelize.define('PostType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  PostType.associate = (models) => {
    PostType.hasMany(models.Post)
  }
  return PostType
}
