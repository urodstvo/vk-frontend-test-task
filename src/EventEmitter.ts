type Listener<T = any> = (...args: T[]) => void;

export class EventEmitter {
  private events: Map<string, Listener[]>;

  constructor() {
    this.events = new Map();
  }

  on<T = any>(eventName: string, listener: Listener<T>): () => void {
    if (!this.events.has(eventName)) this.events.set(eventName, []);
    this.events.get(eventName)!.push(listener);

    return () => this.off(eventName, listener);
  }

  off<T = any>(eventName: string, listener: Listener<T>): void {
    if (!this.events.has(eventName)) return;
    this.events.set(
      eventName,
      this.events.get(eventName)!.filter((l) => l !== listener)
    );
  }

  emit<T = any>(eventName: string, ...args: T[]): void {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName)!.forEach((listener) => listener(args));
  }
}
