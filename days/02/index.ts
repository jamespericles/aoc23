import inputParser from "../util/inputParser"

// Prompt: https://adventofcode.com/2023/day/2

let input = inputParser("days/02/input.txt")

const part1 = (): number => {
  let total = 0

  for (let games of input) {
    // Separate game number and values
    let [game, values] = games.split(":")
    let gameNumber = parseInt(game.replace("Game ", ""))

    // Split 'pulls' by semicolons
    let pulls = values.split("")

    // Flag to track if the input is possible
    let isPossible = true

    for (let pull of pulls) {
      // Split each pull by commas
      let colors = pull.split(",")

      // Object to store the count of each color
      let colorCount = {
        red: 0,
        green: 0,
        blue: 0,
      }

      for (let color of colors) {
        // Extract the number and color
        let [number, colorName] = color.trim().split(" ")

        // Increment the count for the corresponding color
        colorCount[colorName as keyof typeof colorCount] += parseInt(number)

        // Check if the count exceeds the maximum allowed
        if (
          colorCount.red > 12 ||
          colorCount.green > 13 ||
          colorCount.blue > 14
        ) {
          isPossible = false

          // We don't need to continue through the inputs, one invalid input is enough to break
          break
        }
      }

      if (!isPossible) {
        break
      }
    }

    if (isPossible) {
      // Add the game number to the total
      total += gameNumber
    }
  }

  return total
}

const calculatePower = (colorCount: {
  red: number
  green: number
  blue: number
}): number => {
  return colorCount.red * colorCount.green * colorCount.blue
}

const part2 = (): number => {
  let total = 0

  for (let games of input) {
    let [game, values] = games.split(":")
    // let gameNumber = parseInt(game.replace('Game ', ''))

    let pulls = values.split("")

    let colorCount = {
      red: 0,
      green: 0,
      blue: 0,
    }

    for (let pull of pulls) {
      let colors = pull.split(",")

      for (let color of colors) {
        let [number, colorName] = color.trim().split(" ")

        // Only replace the count of a color if it's greater than the current count
        if (
          colorCount[colorName as keyof typeof colorCount] < parseInt(number)
        ) {
          colorCount[colorName as keyof typeof colorCount] = parseInt(number)
        }
      }
    }
    total += calculatePower(colorCount)
  }

  return total
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
