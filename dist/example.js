import { EventEmitter } from "./EventEmitter.js";
const emitter = new EventEmitter();
const logData1 = (data) => console.log(data);
const logData2 = (data) => console.log("@its second listener", data);
emitter.on("data", logData1);
emitter.on("data", logData2);
emitter.emit("data", { message: "Hello, world!" });
emitter.off("data", logData1);
emitter.emit("data", { message: "new message" });
