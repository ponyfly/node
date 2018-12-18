const puppeteer = require('puppeteer')

async function createIndex() {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	page.setViewport({
		width: 1024,
		height: 1600,
	})
	await page.goto('https://www.google.com')
	await page.screenshot({
		path: './imgs/google.png',
		clip: {
			x: 0,
			y: 0,
			width: 750,
			height: 600,
		},
	})

	await browser.close()
}
createIndex()