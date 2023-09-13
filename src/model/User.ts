import { DataType, Model, Table, Column } from "sequelize-typescript";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "user" as string;
  public static USER_ID = "id" as string;
  public static USER_NAME = "name" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_PASSWORD = "password" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_PASSWORD,
  })
  password!: string;
}
