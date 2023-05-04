import {
  AllowNull,
  Column,
  CreatedAt,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPAProcess', schema: 'dbo' })
export class Process extends Model {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  processid: string;

  @Column({ type: DataTypes.STRING(1) })
  ProcessType: string;

  @Column({ type: DataTypes.STRING(128) })
  name: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(1000) })
  description: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(20) })
  version: string;

  @CreatedAt
  @Column({ type: DataTypes.DATE })
  createdate: Date;

  @Unique
  @Column({ type: DataTypes.UUID })
  createdby: string;

  @UpdatedAt
  @Column({ type: DataTypes.DATE })
  lastmodifieddate: Date;

  @Unique
  @Column({ type: DataTypes.UUID })
  lastmodifiedby: string;

  @Column({ type: DataTypes.INTEGER })
  AttributeID: number;

  @AllowNull
  @Column({ type: DataTypes.BLOB })
  compressedxml: string;

  @AllowNull
  @Column({ type: DataTypes.STRING })
  processxml: string;

  @AllowNull
  @Column({ type: DataTypes.STRING(255) })
  wspublishname: string;

  @Column({ type: DataTypes.INTEGER })
  runmode: number;

  @Column({ type: DataTypes.BOOLEAN })
  sharedObject: boolean;

  @Column({ type: DataTypes.BOOLEAN })
  forceLiteralForm: boolean;

  @Column({ type: DataTypes.BOOLEAN })
  useLegacyNamespace: boolean;
}
