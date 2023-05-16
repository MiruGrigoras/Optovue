import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPASessionLog_NonUnicode', schema: 'dbo' })
export class Stage extends Model {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  logid: string;

  @Column({ type: DataTypes.INTEGER })
  sessionnumber: number;

  @AllowNull
  @Unique
  @Column({ type: DataTypes.UUID })
  stageid: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  stagename: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  stagetype: number;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  processname: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  pagename: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  objectname: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  actionname: string;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  result: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  resulttype: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  startdatetime: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  enddatetime: Date;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  attributexml: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  automateworkingset: number;

  @AllowNull
  @Column({ type: DataTypes.STRING(32) })
  targetappname: string;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  targetappworkingset: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  starttimezoneoffset: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  endtimezoneoffset: number;

  @Column
  attributesize: number;
}
