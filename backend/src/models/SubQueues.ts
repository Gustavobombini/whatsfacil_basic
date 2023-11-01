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
class SubQueues extends Model<SubQueues> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  subQueueName: string;

  @Column
  subQueueMsg: string;

  @Column
  subQueueQueue: number;

  @Column
  queueId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}

export default SubQueues;
