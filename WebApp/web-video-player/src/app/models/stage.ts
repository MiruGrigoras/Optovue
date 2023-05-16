export class Stage{
    logid: string;
    stagename: string;
    startdatetime: Date; 
    result: string;
    constructor(logid: string, stagename: string, startdatetime: Date, result: string){
        this.logid = logid;
        this.stagename = stagename;
        this.startdatetime = startdatetime;
        this.result = result;
    }
}