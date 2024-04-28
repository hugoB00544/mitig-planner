import { DamageNode } from "./DamageNode";

export class DamageLine {
	damageLineIndex: number;

	head?: DamageNode;
	tail?: DamageNode;
	name: string = "(anonymous line)";

	constructor(name:string,id:number) {
		this.damageLineIndex = id;
        this.name=name;
	}
	addDamage(damage: DamageNode) {
		console.assert(damage);
		if (!this.head) {
			this.head = damage;
		} else if (this.tail) {
			this.tail.next = damage;
		} else {
			console.assert(false);
		}
		this.tail = damage;
	}


    deleteAll() {
		while (this.head) {
			this.head = this.head.next;
		}
        
        this.tail = undefined;
        this.head = undefined;
        
    }

}