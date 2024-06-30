type SnackBar = {
	message: string;
	actionText?: string;
	actionHandler?: (dismiss: () => void) => void;
};

type QueueItem = {
	finished?: boolean;
	create: (finishCallback: () => any) => void;
	destroy: () => void;
};

class Queue {
	#items: QueueItem[];

	constructor() {
		this.#items = [];
	}

	static createQueue() {
		return new Queue();
	}

	push(item: QueueItem) {
		this.#items.push(item);
		this.processQueue();
	}

	processQueue() {
		if (this.#items.length > 0) {
			const item = this.#items[0];
			if (item.finished) {
				this.#items.shift();
				this.processQueue();
			} else {
				item.create(() => {
					item.finished = true;
					this.processQueue();
				});
			}
		}
	}
}

const queue = Queue.createQueue();

export type { SnackBar };

export { queue as SnackbarQueue };
