type Listener<T = any> = (...args: T[]) => void;
export declare class EventEmitter {
    private events;
    constructor();
    on<T = any>(eventName: string, listener: Listener<T>): () => void;
    off<T = any>(eventName: string, listener: Listener<T>): void;
    emit<T = any>(eventName: string, ...args: T[]): void;
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map