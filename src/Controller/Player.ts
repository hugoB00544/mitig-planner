import {Job} from "./Job";
import {Line} from "./Line";

export class Player {
    static _gPIndex: number = 0;
    readonly pIndex: number;
    job: Job;
    hp: number;
    maxhp:number;
    mp: number;
    wd: number;
    det: number;
    mainstat: number;

    name: string;

    record?: Line = undefined;
    /**
     *
     */
    constructor(job: Job,name:string, hp:number , mp:number , wd:number , det:number , mainstat:number) {
        this.pIndex = Player._gPIndex;
        this.name = name;
        
        this.hp = job.hp;
        
        
        
        this.maxhp = this.hp;

        if (!mp) {
            this.mp = 10000;
        }else{
            this.mp = mp;
        }

        if (!wd) {
            this.wd = job.wd;
        }else{
            this.wd = wd;
        }

        if (!det) {
            this.det = job.det;
        }else{
            this.det = det;
        }

        if (!mainstat) {
            this.mainstat = job.mainstat;
        }else{
            this.mainstat = mainstat;
        }
        
        
        this.job = job;
        
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
        this.maxhp = job.hp;
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



    public resetPlayer(job: Job,name:string, hp:number , mp:number , wd:number , det:number , mainstat:number) {
        
        this.name = name;
        
        this.hp = job.hp;
        this.maxhp = job.hp;

        if (!mp) {
            this.mp = 10000;
        }else{
            this.mp = mp;
        }

        if (!wd) {
            this.wd = job.wd;
        }else{
            this.wd = wd;
        }

        if (!det) {
            this.det = job.det;
        }else{
            this.det = det;
        }

        if (!mainstat) {
            this.mainstat = job.mainstat;
        }else{
            this.mainstat = mainstat;
        }
        
        
        this.job = job;
        
        this.record = new Line();


        return this;
    }




}
