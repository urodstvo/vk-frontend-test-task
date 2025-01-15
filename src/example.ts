import { EventEmitter } from "./EventEmitter.js";

const emitter = new EventEmitter();

const logData = (data: unknown) => console.log(data);

emitter.on("data", logData);

emitter.emit("data", { message: "Hello, world!" });

emitter.off("data", logData);

emitter.emit("data", { message: "new message" });
