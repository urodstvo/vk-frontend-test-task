export class EventEmitter {
    events;
    constructor() {
        this.events = new Map();
    }
    on(eventName, listener) {
        if (!this.events.has(eventName))
            this.events.set(eventName, []);
        this.events.get(eventName).push(listener);
        return () => this.off(eventName, listener);
    }
    off(eventName, listener) {
        if (!this.events.has(eventName))
            return;
        this.events.set(eventName, this.events.get(eventName).filter((l) => l !== listener));
    }
    emit(eventName, ...args) {
        if (!this.events.has(eventName))
            return;
        this.events.get(eventName).forEach((listener) => listener(args));
    }
}
