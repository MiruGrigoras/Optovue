export class Stage{
    logid: string;
    stagename: string;
    startdatetime: Date; 
    result: string;
    stageIndex: number;
    constructor(logid: string, stagename: string, startdatetime: Date, result: string, stageIndex: number){
        this.logid = logid;
        this.stagename = stagename;
        this.startdatetime = startdatetime;
        this.result = result;
        this.stageIndex = stageIndex;
    }
}