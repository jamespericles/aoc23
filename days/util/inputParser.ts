import { readFileSync } from 'fs'
import { join } from 'path'

const inputParser = (fileName: string) => {
  const input: string[] = readFileSync(join('', fileName), { encoding: 'utf-8' }).split('\n')

  return input
}

export default inputParser