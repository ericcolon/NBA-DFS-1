export default (sequelize, DataTypes) => {
  const TagType = sequelize.define('TagType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  TagType.associate = (models) => {
    TagType.hasMany(models.Tag);
  }
  return TagType
}
