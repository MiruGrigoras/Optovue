import {
  Column,
  CreatedAt,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'BPAProcess', schema: 'dbo' })
export class BPAProcess extends Model<BPAProcess> {
  @Unique
  @Column({ type: DataTypes.UUID, primaryKey: true })
  processid: number;

  @Column({ type: DataTypes.STRING(1) })
  ProcessType: string;

  @Column({ type: DataTypes.STRING(128) })
  name: string;

  @Column({ type: DataTypes.STRING(1000) })
  description: string;

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

  @Column({ type: DataTypes.BLOB })
  compressedxml: string;

  @Column({ type: DataTypes.STRING })
  processxml: string;

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
