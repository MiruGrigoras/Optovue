import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dbo.BPAProcess', synchronize: true })
export class Process {
  @PrimaryColumn({ type: 'uniqueidentifier' })
  processid: number;

  @Column({ type: 'nvarchar' })
  ProcessType: string;

  @Column({ type: 'nvarchar' })
  name: string;

  @Column({ type: 'nvarchar' })
  description: string;

  @Column({ type: 'nvarchar' })
  version: string;

  @Column({ type: 'datetime' })
  createdate: Date;

  @Column({ type: 'uniqueidentifier' })
  createdby: string;

  @Column({ type: 'datetime' })
  lastmodifieddate: Date;

  @Column({ type: 'uniqueidentifier' })
  lastmodifiedby: string;

  @Column({ type: 'int' })
  AttributeID: number;

  @Column({ type: 'image' })
  compressedxml: string;

  @Column({ type: 'nvarchar' })
  processxml: string;

  @Column({ type: 'varchar' })
  wspublishname: string;

  @Column({ type: 'int' })
  runmode: number;

  @Column({ type: 'bit' })
  sharedObject: boolean;

  @Column({ type: 'bit' })
  forceLiteralForm: boolean;

  @Column({ type: 'bit' })
  useLegacyNamespace: boolean;
}
