export class Session{
    sessionid: string;
    sessionnumber: number;
    startdatetime: Date;
    starttimezoneoffset: number; 
    enddatetime: Date;
    constructor(sessionId: string, sessionnumber:number, startdatetime: Date, starttimezoneoffset: number, enddatetime: Date){
        this.sessionid = sessionId;
        this.sessionnumber = sessionnumber;
        this.startdatetime = startdatetime;
        this.starttimezoneoffset = starttimezoneoffset;
        this.enddatetime = enddatetime;
    }
}