import inputParser from '../util/inputParser'

// Prompt: https://adventofcode.com/2023/day/2

let input = inputParser('days/02/input.txt')

// Part 1
let total = 0

for (let games of input) {
  // Separate game number and values
  let [game, values] = games.split(':')
  let gameNumber = parseInt(game.replace('Game ', ''))

    // Split 'pulls' by semicolons
    let pulls = values.split(';')

    // Flag to track if the input is possible
    let isPossible = true
  
    for (let pull of pulls) {
      // Split each pull by commas
      let colors = pull.split(',')
  
      // Object to store the count of each color
      let colorCount = {
        red: 0,
        green: 0,
        blue: 0
      }
  
      for (let color of colors) {
        // Extract the number and color
        let [number, colorName] = color.trim().split(' ')

        // Increment the count for the corresponding color
        colorCount[colorName as keyof typeof colorCount] += parseInt(number)

        // Check if the count exceeds the maximum allowed
        if (colorCount.red > 12 || colorCount.green > 13 || colorCount.blue > 14) {
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
  console.log("file: index.ts:62 ~ total:", total)
  