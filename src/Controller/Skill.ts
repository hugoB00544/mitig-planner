import {Buff} from "./Buff";

export class Skill {
    static _gSkillIndex: number = 0;
    readonly skillIndex: number;
    readonly name: string;
    readonly icon: string;
    #buffs: Set<Buff>;

    /**
     *
     */
    constructor(name: string, icon: string) {
        this.skillIndex = Skill._gSkillIndex;
        this.name = name;
        this.icon = icon;

        this.#buffs = new Set<Buff>();
        Skill._gSkillIndex++;
    }

    
    public getSkillIndex(){return this.skillIndex;}
    public getName(){return this.name;}

   
    public addBuff(buff: Buff) {
        this.#buffs.add(buff);
    }
    public getBuffs() {
        return this.#buffs;
    }

    public targetable() {
        var targetable = false;

        this.#buffs.forEach(buff => {
            if (buff.targetable) {
                
                
                targetable = true;
            }
            
          });
          return targetable;
    }

    /**
     * copy
     */
    public copy() {
        let copy = new Skill("test","test");
        return copy;
    }

}

