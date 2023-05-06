import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPAWorkQueueItem', schema: 'dbo' })
export class QueueItem extends Model {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  id: string;

  @Unique
  @Column({ type: DataTypes.UUID })
  queueid: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(255) })
  keyvalue: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(255) })
  status: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  attempt: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  loaded: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  completed: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  exception: Date;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  exceptionreason: string;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  deferred: Date;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  worktime: number;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  data: string;

  @Column({ type: DataTypes.INTEGER })
  queueident: number;

  @Column({ type: DataTypes.INTEGER })
  ident: number;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  sessionid: string;

  @Column({ type: DataTypes.INTEGER })
  priority: number;

  @Column({ type: DataTypes.INTEGER })
  prevworktime: number;

  @AllowNull
  @Column
  attemptworktime: number;

  @AllowNull
  @Column
  finished: Date;

  @AllowNull
  @Column
  exceptionreasonvarchar: string;

  @AllowNull
  @Column
  exceptionreasontag: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  encryptid: number;

  @AllowNull
  @Column
  lastupdated: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  locktime: Date;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  lockid: string;
}
