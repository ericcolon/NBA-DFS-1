export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TagTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Tag.associate = (models) => {
    Tag.belongsTo(models.Post);
    Tag.belongsTo(models.User);
    Tag.belongsTo(models.TagType);
  }

  return Tag;
}
