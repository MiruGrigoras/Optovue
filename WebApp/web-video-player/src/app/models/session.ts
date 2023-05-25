export class Session{
    sessionid: string;
    processid: string;
    sessionnumber: number;
    startdatetime: Date;
    starttimezoneoffset: number; 
    enddatetime: Date;
    constructor(sessionId: string, processid:string, sessionnumber:number, startdatetime: Date, starttimezoneoffset: number, enddatetime: Date){
        this.sessionid = sessionId;
        this.processid = processid;
        this.sessionnumber = sessionnumber;
        this.startdatetime = startdatetime;
        this.starttimezoneoffset = starttimezoneoffset;
        this.enddatetime = enddatetime;
    }
}