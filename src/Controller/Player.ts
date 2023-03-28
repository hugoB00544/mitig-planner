import {Job} from "./Job";
import {Line} from "./Line";

export class Player {
    static _gPIndex: number = 0;
    readonly pIndex: number;
    job: Job;
    hp: number;
    mp: number;
    wd: number;
    det: number;
    mainstat: number;

    record?: Line = undefined;
    /**
     *
     */
    constructor(job: Job) {
        this.pIndex = Player._gPIndex;
        this.hp = job.hp;
        this.mp = 10000;
        this.job = job;
        this.wd = job.wd;
        this.det = job.det;
        this.mainstat = job.mainstat;
        this.record = new Line();
        Player._gPIndex++;
    }

    
    public getPIndex(){return this.pIndex;}

    /**
     * setRecord
     */
    public setRecord(rec: Line) {
        this.record = rec;
    }

    /**
     * changeJob
     */
    public changeJob(job: Job) {
        if (this.record) {
            this.record.deleteAll();
        }
        
        
        this.job = job;
        this.hp = job.hp;
        this.wd = job.wd;
        this.det = job.det;
        this.mainstat = job.mainstat;
    }

    /**
     * getSkills
     */
    public getSkills() {
        return this.job.getSkills();
    }




}
