export const enum DamageType {
	Magic = "Magic",
	Physic = "Physic",
    Death = "Death"
}


export class DamageNode {
    static _gDamageIndex: number = 0;

    #damageIndex: number;
    name: string;
    time: number;
    type:DamageType;
    damage:number;

    next?: DamageNode = undefined;

    constructor(name: string, time: number, type: DamageType,damage:number) {
        this.#damageIndex = DamageNode._gDamageIndex;
        this.name = name;
        this.time = time;
        this.type = type;
        this.damage = damage;

        DamageNode._gDamageIndex++;
        
    }

    
    public getDamageIndex(){return this.#damageIndex;}

    
}