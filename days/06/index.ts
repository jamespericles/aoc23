import inputParser from "../util/inputParser"

// Prompt: https://adventofcode.com/2020/day/6

let input = inputParser('days/06/input.txt')

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// Pass true for part 1, false for part 2
const sanitizedInput = ((input: string[], splitNumbers: boolean): { time: number[]; distance: number[] } => {
  let timeLine = input[0].split(':')
  let distanceLine = input[1].split(':')

  let time = splitNumbers 
    ? timeLine[1].trim().split(/\s+/).map(Number)
    : [Number(timeLine[1].replace(/\s+/g, ''))]
  let distance = splitNumbers 
    ? distanceLine[1].trim().split(/\s+/).map(Number)
    : [Number(distanceLine[1].replace(/\s+/g, ''))]

  return { time, distance }
})(input, false)

const countWaysToBeatRecord = (time: number[], distance: number[]): number[] => {
  const result: number[] = []

  for (let i = 0; i < time.length; i++) {
    const raceTime = time[i]
    const maxRecord = distance[i]

    let waysToBeatRecord = 0

    for (let holdTime = 0; holdTime <= raceTime; holdTime++) {
      const speed = holdTime
      const remainingTime = raceTime - holdTime

      const totalDistance = speed * remainingTime

      if (totalDistance > maxRecord) {
        waysToBeatRecord++
      }
    }

    result.push(waysToBeatRecord)
  }

  return result
}

const marginOfError = ((sanitizedInput: { time: number[]; distance: number[] }): number => {
  const { time, distance } = sanitizedInput

  const waysToBeatRecord = countWaysToBeatRecord(time, distance)

  return waysToBeatRecord.reduce((a, b) => a * b, 1)
})(sanitizedInput)

console.log(`marginOfError: ${marginOfError}`)