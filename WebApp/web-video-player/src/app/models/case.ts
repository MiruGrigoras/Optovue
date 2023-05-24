export class Case{
    id: string;
    keyvalue: string;
    sessionid: string;
    loaded: Date;
    started: Date;
    completed: Date;
    exception: Date;
    finished: Date;
    localStorageIndex: number;
    constructor(id:string, key: string, sessionid: string, loaded: Date, completed: Date, exception: Date, finished: Date, localStorageIndex: number){
        this.id = id;
        this.keyvalue = key;
        this.sessionid = sessionid;
        this.loaded = loaded;
        this.started = loaded;
        this.completed = completed;
        this.exception = exception;
        this.finished = finished;
        this.localStorageIndex = localStorageIndex;
    }
}