import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPASession', schema: 'dbo' })
export class Session extends Model {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  sessionid: string;

  @Column({ type: DataTypes.INTEGER })
  sessionnumber: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  startdatetime: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  enddatetime: Date;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  processid: string;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  starterresourceid: string;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  starteruserid: string;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  runningresourceid: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(50) })
  runningosusername: string;

  @Column({ type: DataTypes.INTEGER })
  statusid: number;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  startparamsxml: string;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  logginglevelsxml: string;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  sessionstatexml: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  queueid: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  stoprequested: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  stoprequestack: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  lastupdated: Date;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  laststage: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  warningthreshold: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  starttimezoneoffset: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  endtimezoneoffset: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  lastupdatedtimezoneoffset: number;
}
