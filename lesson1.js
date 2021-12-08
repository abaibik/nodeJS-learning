const colors = require("colors/safe");
const prompt = require("prompt-sync")({ sigint: true });

// const min = prompt(
//   "I show you all prime numbers between the given ranges. Enter a lower limit"
// );
// const max = prompt("Enter the upper limit of a range");

function getPrimes(num) {
  const seive = [];
  const primes = [];

  for (let i = 2; i <= num; i++) {
    if (!seive[i]) {
      primes.push(i);

      for (let j = i * i; j <= num; j += i) {
        seive[j] = true;
      }
    }
  }
  return primes;
}

console.log(colors.green(getPrimes(120)));
