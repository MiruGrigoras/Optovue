export class Stage{
    logid: string;
    stagename: string;
    startdatetime: Date; 
    result: string;
    stageIndex: number;
    relativeTime: string
    constructor(logid: string, stagename: string, startdatetime: Date, result: string, stageIndex: number, relativeTime: string){
        this.logid = logid;
        this.stagename = stagename;
        this.startdatetime = startdatetime;
        this.result = result;
        this.stageIndex = stageIndex;
        this.relativeTime = relativeTime;
    }
}