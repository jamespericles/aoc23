import inputParser from "../util/inputParser"

// Prompt: https://adventofcode.com/2020/day/4

let input = inputParser('days/04/input.txt')

let part1 = 0 
let part2 = 0

const cardInstances = new Array(input.length).fill(1)

input.forEach((line, idx) => {
  const [, winning, card] = line.split(/[:|]/g)

  const winningNumbers = winning.trim().split(/\s+/).map(Number)
  const cardNumbers = card.trim().split(/\s+/).map(Number)
  let matchCount = cardNumbers.filter((num) => winningNumbers.includes(num)).length

  if (matchCount) {
    const points = 2 ** (matchCount - 1)
    part1 += points

    for (let i = idx + 1; i <= idx + matchCount; i++) {
      cardInstances[i] += cardInstances[idx]
    }
  }
})

part2 = cardInstances.reduce((acc, curr) => acc + curr, 0)

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)