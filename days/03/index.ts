import inputParser from "../util/inputParser"

// Prompt: https://adventofcode.com/2020/day/3

let input = inputParser('days/03/input.txt')

const rows: number = input.length;
const cols: number = input[0].length;
const symbolsToFind: string[] = ['#', '*', '+', '$', '@', '/', '&', '=', '-', '%'];

const part1 = (input: string[]): number => {
  let total = 0
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentSymbol: string = input[row][col]
  
      if (symbolsToFind.includes(currentSymbol)) {
        console.log(`Found symbol ${currentSymbol} at position (${row}, ${col}):`)
  
        // Check the eight surrounding positions
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow: number = row + i
            const newCol: number = col + j
  
            // Check boundaries to avoid index out-of-bounds errors
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              const surroundingChar: string = input[newRow][newCol]
  
              // Match single digits around the special symbol
              const digitMatches: RegExpMatchArray | null = surroundingChar.match(/\d/g)
  
              if (digitMatches) {
                // Traverse left to find the whole number
                let wholeNumber = ""
                for (let k = newCol - 1; k >= 0 && /\d/.test(input[newRow][k]); k--) {
                  wholeNumber = input[newRow][k] + wholeNumber
                }
  
                // Traverse right to find the whole number
                for (let k = newCol; k < cols && /\d/.test(input[newRow][k]); k++) {
                  wholeNumber += input[newRow][k]
                  input[newRow] = input[newRow].substring(0, k) + '.' + input[newRow].substring(k + 1)
                }
                total += parseInt(wholeNumber)
  
                console.log(`  Whole number at (${newRow}, ${newCol}): ${wholeNumber}`)
              }
            }
          }
        }
      }
    }
  }

  return total
}

const part2 = (input: string[]): number => {
  let total = 0
  let numbersArray: number[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentSymbol: string = input[row][col]
  
      if (['*'].includes(currentSymbol)) {
        console.log(`Found symbol ${currentSymbol} at position (${row}, ${col}):`)

        // Check the eight surrounding positions
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow: number = row + i
            const newCol: number = col + j
  
            // Check boundaries to avoid index out-of-bounds errors
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              const surroundingChar: string = input[newRow][newCol]
  
              // Match single digits around the special symbol
              const digitMatches: RegExpMatchArray | null = surroundingChar.match(/\d/g)

              if (digitMatches) {
                // Traverse left to find the end of the whole number
                let wholeNumber = ""
                for (let k = newCol - 1; k >= 0 && /\d/.test(input[newRow][k]); k--) {
                  wholeNumber = input[newRow][k] + wholeNumber
                }
  
                // Traverse back right to build the whole number
                for (let k = newCol; k < cols && /\d/.test(input[newRow][k]); k++) {
                  wholeNumber += input[newRow][k]
                  input[newRow] = input[newRow].substring(0, k) + '.' + input[newRow].substring(k + 1)
                }

                numbersArray.push(parseInt(wholeNumber))
                console.log(`  Whole number at (${newRow}, ${newCol}): ${wholeNumber}`)

                if (numbersArray.length === 2) {
                  total += numbersArray.reduce((a, b) => a * b, 1)
                  console.log(`  Multiplying ${numbersArray[0]} and ${numbersArray[1]} to get ${numbersArray[0] * numbersArray[1]}`)
                  numbersArray = []
                }
              }
            }            
          }
        }

        // We're only interested in '*' with two surrounding symbols
        if (numbersArray.length === 1) {
          numbersArray = []
          console.log(`   only found one surrounding number, purging`)
        }
      }
    }
  }

  return total
}

// console.log(`Part 1: ${part1(input)}`)
console.log(`Part 2: ${part2(input)}`)
