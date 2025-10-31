import { Model, DataTypes, type Optional } from "sequelize";
import sequelize from "../config/database.js";

interface PostAttributes {
  id: number;
  title: string;
  content?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  declare id: number;
  declare title: string;
  declare content: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: any) {
    // Post.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'author',
    // });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    sequelize,
  }
);

export default Post;