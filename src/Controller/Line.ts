import { ActionNode } from "./ActionNode";

export class Line {
	static _gLineIndex: number = 0;
	_lineIndex: number;

	head?: ActionNode;
	tail?: ActionNode;
	name: string = "(anonymous line)";

	constructor() {
		this._lineIndex = Line._gLineIndex;
		Line._gLineIndex++;
	}
	addAction(action: ActionNode) {
		console.assert(action);
		if (!this.head) {
			this.head = action;
		} else if (this.tail) {
			this.tail.next = action;
		} else {
			console.assert(false);
		}
		this.tail = action;
	}
	iterateAll(fn: (node: ActionNode) => void): void {
		let itr: ActionNode | undefined = this.head;
		while (itr) {
			fn(itr);
			itr = itr.next;
		}
	}
	getFirstAction() {
		return this.head;
	}
	getLastAction(condition? : (node: ActionNode) => boolean) {
		if (condition===undefined) {
			return this.tail;
		} else {
			let lastMatch : ActionNode | undefined = undefined;
			this.iterateAll(node=>{
				if (condition(node)) {
					lastMatch = node;
				}
			});
			return lastMatch;
		}
	}

    deleteAll() {
		while (this.head) {
			this.head = this.head.next;
		}
        
        this.tail = undefined;
        this.head = undefined;
        
    }


	getLastTime() {
		let head = this.head;
		let time: number = 0;
		while (head) {
			if (head.time > time) {
				time = head.time;
			}


			head = head.next;
		}
		return time;
        
    }

	serialized(): {name: string, actions: object[]} {
		let list : object[] = [];
		let itr = this.head;
		while (itr) {
			list.push({
				actionIndex: itr.getActionIndex(),
				buffName: itr.name,
				buffIcon: itr.getIcon(),
				time: itr.time,
			});
			itr = itr.next;
		}
		return {
			name: this.name,
			actions: list
		};
	}
}
