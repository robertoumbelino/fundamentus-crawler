import { GroupedFiisType } from '.'

const fiisWithoutProperties = ['Híbrido', 'Títulos e Val. Mob.']

export const removeWrongFiis = (fiis: GroupedFiisType) => {
  return Object.entries(fiis).reduce((acc, cur) => {
    const key = cur[0]
    const values = cur[1]

    const dividendYeldFilter = values.filter(
      currentFii => currentFii.dividendYeld > 5 && currentFii.dividendYeld < 20
    )

    const pvpFilter = dividendYeldFilter.filter(
      currentFii => currentFii.pvp > 0.75 && currentFii.pvp < 1.2
    )

    const liquidityFilter = pvpFilter.filter(
      currentFii => currentFii.liquidez > 50000
    )

    const amounOfPropertiesFilter = liquidityFilter.filter(
      currentFii =>
        currentFii.qtdImoveis >= 5 ||
        fiisWithoutProperties.includes(currentFii.segmentacao)
    )

    const vacancyFilter = amounOfPropertiesFilter.filter(
      currentFii => currentFii.vacanciaMedia < 10
    )

    return { ...acc, [key]: vacancyFilter || [] }
  }, {})
}
