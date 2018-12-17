console.time('html2img')
const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path')

const htmlDir = 'shareDailySign'
let browser = null

const getFileName = (filePath) => {
	const files = fs.readdirSync(filePath)
	htmlFiles = files.filter(file => file.endsWith('.html'))
	return htmlFiles
}

const initAllPage = () => {
	const htmls = getFileName(path.resolve(__dirname, htmlDir))
	const pages = htmls.map((html) => {
		return async () => {
			const page = await browser.newPage()
			page.setViewport({
				width: 1024,
				height: 1600,
			})
			console.log(path.resolve(__dirname, htmlDir, html))
			await page.goto(path.resolve(__dirname, htmlDir, html))
			// 获取pic元素
			const pic = await page.$('#pic')
			console.log(html.slice(0, -5))
			await pic.screenshot({
				path: path.resolve(__dirname, 'imgs', `${html.slice(0, -5)}.png`),
			})
		}
	})
	return pages
}

const creat1 = async () => {
	const page = await browser.newPage()
	page.setViewport({
		width: 1024,
		height: 1600,
	})
	await page.goto(`${__dirname}/shareDailySign/groupToolIndex.html`)
	// 获取pic元素
	const pic = await page.$('#pic')
	await pic.screenshot({
		path: './imgs/1.png',
	})
}

const creat2 = async () => {
	const page = await browser.newPage()
	page.setViewport({
		width: 1024,
		height: 1600,
	})
	await page.goto(`${__dirname}/shareDailySign/groupToolSignForFriendGroupModel.html`)
	// 获取pic元素
	const pic = await page.$('#pic')
	await pic.screenshot({
		path: './imgs/2.png',
	})
}

const creat3 = async () => {
	const page = await browser.newPage()
	page.setViewport({
		width: 1024,
		height: 1600,
	})
	await page.goto(`${__dirname}/shareDailySign/groupToolSignOnlyContentModel.html`)
	// 获取pic元素
	const pic = await page.$('#pic')
	await pic.screenshot({
		path: './imgs/3.png',
	})
}

const start = async () => {
	let pages = initAllPage()
	browser = await puppeteer.launch()
	pages = pages.map(page => page())
	await Promise.all(pages)
	await browser.close()
	console.timeEnd('html2img')
}

start()

async function createIndex() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	page.setViewport({
		width: 1024,
		height: 1600,
	})
	await page.goto(`${__dirname}/shareDailySign/groupToolIndex.html`)
	// await page.screenshot({
	// 	path: './imgs/0.png',
	// 	clip: {
	// 		x: 0,
	// 		y: 0,
	// 		width: 750,
	// 		height: 600,
	// 	},
	// })

	await browser.close()
}
