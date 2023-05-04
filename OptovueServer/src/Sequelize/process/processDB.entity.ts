import { BPAProcess } from './process.entity';

export class ProcessDB {
  readonly processid: number;

  readonly ProcessType: string;

  readonly name: string;

  readonly description: string;

  readonly version: string;

  readonly createdate: Date;

  readonly createdby: string;

  readonly lastmodifieddate: Date;

  readonly lastmodifiedby: string;

  readonly AttributeID: number;

  readonly compressedxml: string;

  readonly processxml: string;

  readonly wspublishname: string;

  readonly runmode: number;

  readonly sharedObject: boolean;

  readonly forceLiteralForm: boolean;

  readonly useLegacyNamespace: boolean;

  constructor(process: BPAProcess) {
    this.processid = process.processid;

    this.ProcessType = process.ProcessType;

    this.name = process.name;

    this.description = process.description;

    this.version = process.version;

    this.createdate = process.createdate;

    this.createdby = process.createdby;

    this.lastmodifieddate = process.lastmodifieddate;

    this.lastmodifiedby = process.lastmodifiedby;

    this.AttributeID = process.AttributeID;

    this.compressedxml = process.compressedxml;

    this.processxml = process.processxml;

    this.wspublishname = process.wspublishname;

    this.runmode = process.runmode;

    this.sharedObject = process.sharedObject;

    this.forceLiteralForm = process.forceLiteralForm;

    this.useLegacyNamespace = process.useLegacyNamespace;
  }
}
