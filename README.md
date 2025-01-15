# Тестовое задание для стажировки VK - frontend

## Второе задание - Написать реализацию EventEmitter.

## Требования

- [x] Реализовать метод `on(eventName, listener)`
- [x] Реализовать метод `off(eventName, listener)`
- [x] Реализовать метод `emit(eventName, ...args)`

## [Пример](./src/example.ts)

```typescript
const emitter = new EventEmitter(); // Создание экземпляра

const logData = (data: unknown) => console.log(data); // Создание listener

emitter.on("data", logData); // Регистрация listener на событие 'data'

emitter.emit("data", { message: "Hello, world!" }); // "[ { message: 'Hello, world!' } ]" --> консоль

emitter.off("data", logData); // Отписка listener от события 'data'

emitter.emit("data", { message: "Hello, world!" }); // Ничего не произойдёт
```
