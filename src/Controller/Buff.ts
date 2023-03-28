export class Buff {
    static _gBuffIndex: number = 0;
    readonly buffIndex: number;
    readonly potency: number;   
    readonly reducedMaxHp: number;   
    readonly reducedPhysic: number;   
    readonly reducedMagic: number;    
    readonly parryRate: number;    
    readonly duration: number;   
    readonly stack: number;   
    readonly cd: number;
    readonly groupMitig: boolean;
    readonly targetable: boolean;
    readonly reusable: boolean;
    readonly name: string;
    readonly icon: string;

    

    constructor(potency: number, reducedMaxHp: number, reducedPhysic: number,
         reducedMagic: number, parryRate: number, duration: number, cd: number, stack: number,
          groupMitig: boolean, targetable: boolean, name: string, icon: string, reusable:boolean) {
        this.buffIndex = Buff._gBuffIndex;
        this.potency = potency;
        this.reducedMaxHp = reducedMaxHp;
        this.reducedPhysic = reducedPhysic;
        this.reducedMagic = reducedMagic;
        this.parryRate = parryRate;
        this.duration = duration;
        this.stack = stack;
        this.cd = cd;
        this.groupMitig = groupMitig;
        this.targetable = targetable;
        this.name = name;
        this.icon = icon;
        this.reusable = reusable;
        Buff._gBuffIndex++;
    }

    
    public getActionIndex(){return this.buffIndex;}
    public getName(){return this.name;}
    public getPotency(){return this.potency;}
    public getReducedMaxHp(){return this.reducedMaxHp;}
    public getReducedPhysic(){return this.reducedPhysic;}
    public getReducedMagic(){return this.reducedMagic;}
    public getParryRate(){return this.parryRate;}
    public getDuration(){return this.duration;}
    public getStack(){return this.stack;}
    public getCd(){return this.cd;}
    public groupedMitig(){return this.groupMitig;}
    public isTargetable(){return this.targetable;}

    public getAllInfo(){
        return{
            "id":this.buffIndex,
            'name':this.name,
            'potency':this.potency,
            'reducedMaxHp':this.reducedMaxHp,
            'reducedPhysic':this.reducedPhysic,
            'reducedMagic':this.reducedMagic,
            'parryRate':this.parryRate,
            'duration':this.duration,
            'stack':this.stack,
            'cd':this.cd,
            'groupMitig':this.groupMitig,
            'targetable':this.targetable
        }
    }
    

      

}