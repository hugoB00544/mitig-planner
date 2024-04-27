import {Buff} from "./Buff";
import { Player } from "./Player";


export class ActionNode {
    static _gActionIndex: number = 0;

    #actionIndex: number;
    #currentDuration: number;
    #currentStack: number;   
    #target: Player|undefined;
    #buff: Buff;
    #resolved: boolean;

    name: string;
    time: number;

    next?: ActionNode = undefined;

    constructor(buff: Buff, time: number, target?:Player|null) {
        this.#actionIndex = ActionNode._gActionIndex;
        this.#currentDuration = buff.duration;
        this.#currentStack = buff.stack;
        this.#buff = buff;

        this.#resolved = false;
        this.#target = target? target:undefined;
        this.name = buff.name;
        this.time = time;

        ActionNode._gActionIndex++;
        
    }

    
    public getActionIndex(){return this.#actionIndex;}
    public getBuffIndex(){return this.#buff.buffIndex;}
    public getPotency(){return this.#buff.getPotency();}
    public getReducedMaxHp(){return this.#buff.getReducedMaxHp();}
    public getReducedPhysic(){return this.#buff.getReducedPhysic();}
    public getReducedMagic(){return this.#buff.getReducedMagic();}
    public getParryRate(){return this.#buff.getParryRate();}
    public getDuration(){return this.#buff.getDuration();}
    public getStack(){return this.#buff.getStack();}
    public getType(){return this.#buff.getType();}
    public getIcon(){return this.#buff.icon;}
    public getCurrentDuration(){return this.#currentDuration;}
    public getCurrentStack(){return this.#currentStack;}

    /**
     * getBuff
     */
    public getBuff() {
        return this.#buff;
    }
    public groupedMitig(){return this.#buff.groupedMitig();}
    public targetable(){return this.#buff.targetable;}
    public reusable(){return this.#buff.reusable;}
    public getTarget(){return this.#target;}
    public resolved(){return this.#resolved;}
    public resolve(){this.#resolved = true;}
    

      

}