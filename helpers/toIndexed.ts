import { compressArray } from './compressArray.ts'

export const toIndexed = (indexArray: Array<string>, names: Array<string>) => {
  const indexes = names.map(name => {
    if (!indexArray.includes(name)) {
      indexArray.push(name)
    }

    return indexArray.indexOf(name)
  })

  return compressArray(indexes)
}