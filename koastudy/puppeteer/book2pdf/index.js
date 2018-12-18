const puppeteer = require('puppeteer')
const BASE_URL = 'http://www.ituring.com.cn'
const SHELF_URL = 'http://www.ituring.com.cn/user/shelf'
const LOGIN_URL = `http://account.ituring.com.cn/log-in?returnUrl=${encodeURIComponent(SHELF_URL)}`

const start = async (userName, password) => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	const viewport = {
		width: 1376,
		height: 768,
	}
	page.setViewport(viewport)
	// 获取所有的书
	await page.goto(LOGIN_URL)
	await page.waitForSelector('#loginForm')
	await page.type('#Email', userName)
	await page.type('#Password', password)
	await page.click('#loginForm  input[type="submit"]')
	await page.waitForSelector('.block-items')
	const books = await page.$eval('.block-items', (element) => {
	  const booksele = element.querySelectorAll('.block-item')
		const bookselearr = Array.from(booksele)
		const books = bookselearr.map((item) => {
			const a = item.querySelector('.book-img a')
			return {
				title: a.getAttribute('title'),
				href: a.getAttribute('href'),
			}
		})
		return books
	})
	console.log(`总共有 ${books.length} 本书`)
	// 获取书的所有章节
	const articleAsyncArr = books.map((book) => {
	  return async () => {
	    const page = await browser.newPage()
		  await page.setViewport(viewport)
		  await page.goto(`${BASE_URL}${book.href}`)
		  await page.waitForSelector('.bookmenu')
		  const articles = await page.$eval('.bookmenu table tbody', (element) => {
			  const articlesEle = element.querySelectorAll('.tr')
			  const articlesEleArr = Array.from(articlesEle)
			  const articles = articlesEleArr.map((element) => {
			    const a = element.querySelector('td a')
				  return {
			    	title: a.innerText.trim(),
					  href: a.getAttribute('href'),
				  }
			  })
			  return articles
		  })
	  }
	})
	const articleAsyncArrPromise = articleAsyncArr.map(a => a())
	const results = await Promise.all(articleAsyncArrPromise)
	console.log(results)
}

start('747048047@qq.com', 'tl1qqoo125.')
