import inputParser from '../util/inputParser'

// Prompt: https://adventofcode.com/2020/day/1
const input: string[] = inputParser('days/01/input.txt')

const numberMap = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
])

const sumOfAll = input
  .map((line) => {
    let numberMatches = line.match(
      /\d|one|two|three|four|five|six|seven|eight|nine/g
    )

    if (numberMatches) {
      const firstDigit = numberMap.get(numberMatches[0])
      const lastDigit = numberMap.get(numberMatches[numberMatches.length - 1])

      if (firstDigit && lastDigit) {
        return parseInt(firstDigit + lastDigit)
      }
    } return 0
  }).reduce((sum, number) => sum + number, 0)

console.log(sumOfAll)