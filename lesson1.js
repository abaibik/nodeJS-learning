const colors = require("colors/safe");
const prompt = require("prompt-sync")({ sigint: true });

const min = parseInt(
  prompt(
    "I show you all prime numbers between the given ranges. Enter a lower limit: "
  )
);
const max = parseInt(prompt("Enter the upper limit of a range: "));

function getColorPrimes(min, max) {
  if (isNaN(min) || isNaN(max)) {
    console.log("Error. I accept only numbers");
    return;
  }

  if (min > max) {
    console.log("Error. Lower limit must be smaller, then upper");
    return;
  }

  const seive = [];
  const primes = [];

  for (let i = 2; i <= max; i++) {
    if (!seive[i]) {
      primes.push(i);

      for (let j = i * i; j <= max; j += i) {
        seive[j] = true;
      }
    }
  }

  if (min < 2) {
    console.log("Error. Lower limit must be bigger, then 2");
    return;
  }
  function isBigEnough(value) {
    return value >= min;
  }

  const filteredPrimes = primes.filter(isBigEnough);
  if (filteredPrimes.length === 0) {
    console.log(colors.red("Sorry, there are no prime numbers in your range"));
  }

  function* generateColors() {
    while (true) {
      yield colors.green;
      yield colors.yellow;
      yield colors.red;
    }
  }

  const gen = generateColors();
  for (const num of filteredPrimes) {
    console.log(gen.next().value(num));
  }
}

getColorPrimes(min, max);
