export default class Mutex {
    private lockAmount: number = 0;
    private locking: Promise<unknown> = Promise.resolve();

    constructor() {
    }

    isLocked(): boolean {
        return this.lockAmount > 0;
    }

    lock(): Promise<() => void> {
        this.lockAmount++;
        
        let unlockNext: () => void;

        let willLock = new Promise(resolve => unlockNext = () => {
            this.lockAmount--;
            resolve();
        });

        let willUnlock: Promise<() => void> = this.locking.then(() => unlockNext);

        this.locking = this.locking.then(() => willLock);

        return willUnlock;
    }
}