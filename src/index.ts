import puppeteer from 'puppeteer'
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
      papel: content[0],
      segmentacao: content[1].trim() || 'Sem segmentação',
      cotacao: content[2],
      dividendYeld: content[4],
      pvp: content[5],
      valorMercado: content[6],
      liquidez: content[7],
      qtdImoveis: content[8],
      capRate: content[11],
      vacanciaMedia: content[12]
    }
  })

  const groupedFiis = fiis.reduce((accumulator, fii) => {
    const segment = fii.segmentacao
    const foundSegment = accumulator[segment] || []

    return { ...accumulator, [segment]: [...foundSegment, fii] }
  }, {})

  console.log(groupedFiis)

  await browser.close()
})()
