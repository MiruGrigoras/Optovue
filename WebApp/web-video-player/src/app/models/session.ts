export class Session{
    sessionid: string;
    sessionnumber: number;
    startdatetime: Date;
    starttimezoneoffset: number;
    constructor(sessionId: string, sessionnumber:number, startdatetime: Date, starttimezoneoffset: number){
        this.sessionid = sessionId;
        this.sessionnumber = sessionnumber;
        this.startdatetime = startdatetime;
        this.starttimezoneoffset = starttimezoneoffset;
    }
}