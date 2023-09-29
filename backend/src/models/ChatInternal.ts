import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  freezeTableName: true, // Impede a pluralização automática
})


@Table
class ChatInternal extends Model<ChatInternal> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  inputValue: string;

  @Column
  de: number;

  @Column
  para: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}

export default ChatInternal;
