import inputParser from '../util/inputParser'

// Prompt: https://adventofcode.com/2020/day/1
const input: string[] = inputParser('days/01/input.txt')

let sum = 0 
let inputLine = 1

const wordToDigit = { 
  'one': '1',
  'two': '2', 
  'three': '3', 
  'four': '4', 
  'five': '5', 
  'six': '6', 
  'seven': '7', 
  'eight': '8', 
  'nine': '9', 
}

for (let line of input) { 
  let numbers = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/g) || []

  for (let word in wordToDigit) { 
    // @ts-ignore 
    numbers = numbers.map(num => num.replace(new RegExp(word, 'g'), wordToDigit[word as keyof typeof wordToDigit])) 
  }

  let firstNumber = numbers[0] 
  let lastNumber = numbers.length > 1 ? numbers[numbers.length - 1] : firstNumber

  if (firstNumber && lastNumber) { 
    let twoDigitNumber = Number(firstNumber + lastNumber) 
    console.log(`Line ${inputLine}: ${twoDigitNumber}`)

    sum += twoDigitNumber 
    inputLine += 1 
  }
}

console.log(`Sum: ${sum}`)