import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPAUser', schema: 'dbo' })
export class User extends Model {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  userid: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  username: string;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  validfromdate: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  validtodate: Date;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  passwordexpirydate: Date;

  @AllowNull
  @Column({ type: DataTypes.STRING(60) })
  useremail: string;

  @AllowNull
  @Column({ type: DataTypes.BOOLEAN })
  isdeleted: boolean;

  @AllowNull
  @Column({ type: DataTypes.BOOLEAN })
  UseEditSummaries: boolean;

  @AllowNull
  @Column({ type: DataTypes.STRING(60) })
  preferredStatisticsInterval: string;

  @AllowNull
  @Column({ type: DataTypes.BOOLEAN })
  SaveToolStripPositions: boolean;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  PasswordDurationWeeks: number;

  @Column({ type: DataTypes.INTEGER })
  AlertEventTypes: number;

  @Column({ type: DataTypes.INTEGER })
  AlertNotificationTypes: number;

  @AllowNull
  @Column({ type: DataTypes.INTEGER })
  LogViewerHiddenColumns: number;

  @AllowNull
  @Column({ type: DataTypes.STRING(128) })
  systemusername: string;

  @Column({ type: DataTypes.INTEGER })
  loginattempts: number;

  @AllowNull
  @Column({ type: DataTypes.DATE })
  lastsignedin: Date;

  @Column({ type: DataTypes.INTEGER })
  authtype: number;
}
