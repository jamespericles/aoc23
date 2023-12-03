import inputParser from "../util/inputParser"

// Prompt: https://adventofcode.com/2020/day/3

let input = inputParser('days/03/input.txt')

const rows: number = input.length;
const cols: number = input[0].length;
const symbolsToFind: string[] = ['#', '*', '+', '$', '@', '/', '&', '=', '-', '%'];

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
console.log(total)