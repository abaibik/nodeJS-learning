// Напишите программу, которая будет принимать на вход несколько аргументов:
// дату и время в формате «час-день-месяц-год».
// Задача программы — создавать для каждого аргумента
// таймер с обратным отсчётом:
// посекундный вывод в терминал состояния таймеров (сколько осталось).
// По истечении какого-либо таймера,
// вместо сообщения о том, сколько осталось,
// требуется показать сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.

const parseInterval = (arg) => {
  const argArray = arg.split("-").map((el) => {
    return parseInt(el);
  });

  const interval =
    argArray[0] * 60 * 60 +
    argArray[1] * 24 * 60 * 60 +
    argArray[2] * 30 * 24 * 60 * 60 +
    argArray[3] * 365 * 24 * 60 * 60;
  return interval;
};

class Timer {
  constructor(interval, name) {
    this.interval = interval;
    this.name = name;
    this.onSecondPassed = this.onSecondPassed.bind(this);
  }
  onSecondPassed() {
    this.interval--;
    if (this.interval <= 0) {
      console.log(`${this.name}: elapsed`);
    } else {
      console.log(`${this.name}: ${this.interval} seconds left`);
    }
  }
}

const myArgs = process.argv.slice(2);

const timers = myArgs.map((el, i) => {
  return new Timer(parseInterval(el), `Timer${i + 1}`);
});

const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

setInterval(() => {
  myEmitter.emit("passed");
}, 1000);

timers.forEach((t) => {
  myEmitter.on("passed", t.onSecondPassed);
});
