import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  AutoIncrement,
  Default,
  HasMany,
  BelongsToMany,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";


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
