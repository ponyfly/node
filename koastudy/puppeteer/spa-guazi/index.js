const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const { USERAGENT } = require('../userAgent')

const start = async (url) => {
  const browser = await puppeteer.launch()
  const viewport = {
    width: 1800,
    height: 1080,
  }
  const userAgent = USERAGENT[Math.floor(Math.random() * (USERAGENT.length - 1))]
  const page = await browser.newPage()
  await page.setUserAgent(userAgent)
  await page.setViewport(viewport)
  await page.goto(url)
  await page.waitForNavigation({
    waitUntil: 'load'
  })
  const title = await page.title()
  console.log(title)
}

start('https://www.guazi.com/hz/buy/')
