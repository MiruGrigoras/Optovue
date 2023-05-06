export class Session{
    sessionid: string;
    startdatetime: Date;
    constructor(sessionId: string, startdatetime: Date){
        this.sessionid = sessionId;
        this.startdatetime = startdatetime;
    }
}