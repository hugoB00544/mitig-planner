import {Skill} from "./Skill";

export class Job {
    static _gJobIndex: number = 0;
    readonly jobIndex: number;
    readonly name: string;
    readonly icon: string;
    readonly hp: number;
    readonly wd: number;
    readonly det: number;
    readonly mainstat: number;
    readonly gcd: number;
    private _skills: Set<Skill>;

    /**
     *
     */
    constructor(name: string, icon: string,hp:number, wd: number, det: number, mainstat: number, gcd: number) {
        this.jobIndex = Job._gJobIndex;
        this.name = name;
        this.icon = icon;
        this.hp = hp;
        this.wd = wd;
        this.det = det;
        this.mainstat = mainstat;
        this.gcd = gcd;

        this._skills = new Set<Skill>();
        Job._gJobIndex++;
    }

    
    public getJobIndex(){return this.jobIndex;}
    public getName(){return this.name;}

   
    public addSkill(skill: Skill) {
        this._skills.add(skill);
    }
    public getSkills(){return this._skills;}
}


