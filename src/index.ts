import puppeteer from 'puppeteer'

import { sortFiis } from './sort'
import { getTopRatedFiis } from './topRate'
import { removeWrongFiis } from './remover'
import { normalizeStringToNumber } from './utils'

export type GroupedFiisType = {
  any: {
    pvp: number
    papel: string
    cotacao: number
    capRate: number
    liquidez: number
    pontuacao: number
    qtdImoveis: number
    segmentacao: string
    dividendYeld: number
    valorMercado: number
    vacanciaMedia: number
  }[]
}
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.fundamentus.com.br/fii_resultado.php')

  const selector = '#tabelaResultado > tbody > tr'
  await page.waitForSelector(selector)

  // Extract the results from the page.
  const values = await page.evaluate(selector => {
    const records = [...document.querySelectorAll(selector)].map(anchor => {
      const title = anchor.textContent?.split('|')[0].trim() || 'Without value'

      return title
    })

    return records
  }, selector)

  const fiis = values.map(data => {
    const content = data.split('\n')

    return {
      pvp: normalizeStringToNumber(content[5]),
      papel: content[0],
      cotacao: normalizeStringToNumber(content[2]),
      capRate: normalizeStringToNumber(content[11]),
      liquidez: normalizeStringToNumber(content[7]),
      pontuacao: 0,
      qtdImoveis: normalizeStringToNumber(content[8]),
      segmentacao: content[1].trim() || 'Sem segmentação',
      dividendYeld: normalizeStringToNumber(content[4]),
      valorMercado: normalizeStringToNumber(content[6]),
      vacanciaMedia: normalizeStringToNumber(content[12])
    }
  })

  const groupedFiis = fiis.reduce((accumulator, fii) => {
    const segment = fii.segmentacao
    const foundSegment = accumulator[segment] || []

    return { ...accumulator, [segment]: [...foundSegment, fii] }
  }, {})

  const topFiis = await Promise.resolve(groupedFiis)
    // .then(removeWrongFiis)
    .then(sortFiis)
    .then(getTopRatedFiis)

  console.log(topFiis)

  await browser.close()
})()
