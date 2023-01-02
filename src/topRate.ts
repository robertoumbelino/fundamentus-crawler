import { GroupedFiisType } from '.'

export const getTopRatedFiis = (fiis: GroupedFiisType) => {
  return Object.entries(fiis).reduce((acc, cur) => {
    const key = cur[0]
    const values = cur[1]

    if (!values.length) return { ...acc, [key]: [] }

    const topRatedFiis = values.slice(0, values.length > 2 ? 3 : values.length)

    return { ...acc, [key]: topRatedFiis }
  }, {})
}
