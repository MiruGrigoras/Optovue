export class Case{
    id: string;
    sessionid: string;
    loaded: Date;
    completed: Date;
    exception: Date;
    finished: Date;
    constructor(id:string, sessionid: string, loaded: Date, completed: Date, exception: Date, finished: Date){
        this.id = id;
        this.sessionid = sessionid;
        this.loaded = loaded;
        this.completed = completed;
        this.exception = exception;
        this.finished = finished;
    }
}