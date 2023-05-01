import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Process extends Model {
  @Column({ type: DataTypes.INTEGER, primaryKey: true, unique: true })
  processid: number;

  @Column({ type: DataTypes.STRING(1) })
  ProcessType: string;

  @Column({ type: DataTypes.STRING(128) })
  name: string;

  @Column({ type: DataTypes.STRING(1000) })
  description: string;

  @Column({ type: DataTypes.STRING(20) })
  version: string;

  @Column({ type: DataTypes.DATE })
  createdate: Date;

  @Column({ type: DataTypes.STRING, unique: true })
  createdby: string;

  @Column({ type: DataTypes.DATE })
  lastmodifieddate: Date;

  @Column({ type: DataTypes.STRING })
  lastmodifiedby: string;

  @Column({ type: DataTypes.INTEGER })
  AttributeID: number;

  @Column({ type: DataTypes.STRING })
  compressedxml: string;

  @Column({ type: DataTypes.STRING })
  processxml: string;

  @Column({ type: DataTypes.STRING })
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

// Process.init(
//   {
//     processid: {
//       // type: 'uniqueidentifier',
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     ProcessType: {
//       type: DataTypes.STRING(1),
//     },
//     name: {
//       type: DataTypes.STRING(128),
//     },
//     description: {
//       type: DataTypes.STRING(1000),
//       allowNull: true,
//     },
//     version: {
//       type: DataTypes.STRING(20),
//       allowNull: true,
//     },
//     createdate: {
//       type: DataTypes.DATE,
//     },
//     createdby: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     lastmodifieddate: {
//       type: DataTypes.DATE,
//     },
//     lastmodifiedby: {
//       type: DataTypes.STRING,
//     },
//     AttributeID: {
//       type: DataTypes.INTEGER,
//     },
//     compressedxml: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     processxml: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     wspublishname: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     runmode: {
//       type: DataTypes.INTEGER,
//     },
//     sharedObject: {
//       type: DataTypes.BOOLEAN,
//     },
//     forceLiteralForm: {
//       type: DataTypes.BOOLEAN,
//     },
//     useLegacyNamespace: {
//       type: DataTypes.BOOLEAN,
//     },
//   },
//   { sequelize },
// );

// User.init({
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'User' // We need to choose the model name
// });
