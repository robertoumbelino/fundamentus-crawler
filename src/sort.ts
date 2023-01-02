import { GroupedFiisType } from '.'

const fiisWithoutProperties = ['Híbrido', 'Títulos e Val. Mob.']

export const sortFiis = (fiis: GroupedFiisType) => {
  return Object.entries(fiis).reduce((acc, cur) => {
    const key = cur[0]
    const values = cur[1]

    if (!values.length) return { ...acc, [key]: [] }

    const multiplier = 10 / values.length

    const valuesWithPontuaction = values
      /**
       * Liquidez.
       */
      .sort((current, next) => (current.liquidez < next.liquidez ? 1 : -1)) //maior melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Pvp.
       */
      .sort((current, next) => (current.pvp > next.pvp ? 1 : -1)) //menor melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Dividend yeld.
       */
      .sort((current, next) =>
        current.dividendYeld < next.dividendYeld ? 1 : -1
      ) //maior melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Valor de mercado.
       */
      .sort((current, next) =>
        current.valorMercado < next.valorMercado ? 1 : -1
      ) //maior melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Vacancia média.
       */
      .sort((current, next) =>
        current.vacanciaMedia > next.vacanciaMedia ? 1 : -1
      ) //menor melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Ordenar pela pontuação.
       */
      .sort((current, next) => (current.pontuacao < next.pontuacao ? 1 : -1))

    if (!fiisWithoutProperties.includes(key))
      return { ...acc, [key]: valuesWithPontuaction }

    const valuesWithPropertiesQuantity = valuesWithPontuaction
      /**
       * Quantidade imóveis.
       */
      .sort((current, next) => (current.qtdImoveis > next.qtdImoveis ? 1 : -1)) //menor melhor
      .map((fii, index) => {
        const newPontuaction = (values.length - index) * multiplier

        return {
          ...fii,
          pontuacao: fii.pontuacao + newPontuaction
        }
      })

      /**
       * Ordenar pela pontuação.
       */
      .sort((current, next) => (current.pontuacao < next.pontuacao ? 1 : -1))

    return { ...acc, [key]: valuesWithPropertiesQuantity }
  }, {})
}
