const root = document.createElement('div')

// HELPERS
const makeClassName = (str) => str.toLowerCase().split(' ').join('-')

const addItemsTo = (mainRoot) => (...items) => {
	items.forEach(item => {
		mainRoot.appendChild(item)
	})
}

// MAIN SETUP
const header = document.createElement('h1')
header.className = 'header'
header.innerText = 'JavaScript practice'
const menu = document.createElement('ul')
menu.className = 'main-menu'
const mainBody = document.createElement('div')
mainBody.className = 'main-body'

// PAGES
const menuItems = ['Main info', 'Add images', 'Tab component', 'Amazon button']

// PAGE: Main info
const mainInfo = document.createElement('div')
mainInfo.className= makeClassName(menuItems[0])
mainInfo.innerText = `This is going to be some practice javascript to get ready for my little test thingy`

// PAGE: add images
const addImages = document.createElement('div')
addImages.className= makeClassName(menuItems[1])
const addImagesButton = document.createElement('button')
const imageList = document.createElement('ul')
imageList.className = 'img-list-ul'
addItemsTo(addImages)(addImagesButton, imageList)
addImagesButton.innerText = 'Get random image'
let i = 0
const getImage = async () => {
	const data = await fetch('https://picsum.photos/100')
	console.log(data)
	const img = document.createElement('img')
	img.src = data.url
	img.alt = `From lorem picsum item ${++i}`
	const imgItem = document.createElement('li')
	imgItem.appendChild(img)
	imageList.appendChild(imgItem)

	imgItem.addEventListener('dblclick', (e) => {
		imageList.childNodes.forEach(listItem => {
			const currImg = listItem.childNodes[0].src
			if(currImg === e.target.src){
				listItem.remove()
			}
		})
	})
}
addImagesButton.addEventListener('click', getImage)

// PAGE: Tab component
const tabComponent = document.createElement('div')
tabComponent.className = makeClassName(menuItems[2])

const tcData = [
	{
		title: 'Card 1',
		question: 'What is the capital of the US?',
		answer: 'Washington, DC',
	},
	{
		title: 'Card 2',
		question: 'What is the capital of CR?',
		answer: 'San Jose',
	},
	{
		title: 'Card 3',
		question: 'lorem???',
		answer: 'ipsum',
	},
]

let tcDataIndex = 0
let isQuestionEnabled = true

const tabComponentList = document.createElement('ul')
tabComponentList.className = 'tc-list'

const tabComponentBody = document.createElement('div')
tabComponentBody.className = 'tc-body'

const extraStuff = document.createElement('p')

tcData.forEach((compItem, idx) => {
	const listItem = document.createElement('li')
	listItem.innerText = compItem.title
	tabComponentList.appendChild(listItem)

	if(idx === 0){
		listItem.classList.add('selected')
	}

	listItem.addEventListener('click', () => {
		document.querySelectorAll('.tc-list > li').forEach(item => {
			item.classList.remove('selected')
		})

		listItem.classList.add('selected')
		tcDataIndex = idx

		tabComponentBody.innerText = tcData[idx].question
	})
})

tabComponentBody.addEventListener('click', () => {
	isQuestionEnabled = !isQuestionEnabled
	const isQuestion = isQuestionEnabled ? 'question': 'answer'
	tabComponentBody.innerText = tcData[tcDataIndex][isQuestion]
})

tabComponentBody.innerText = tcData[tcDataIndex].question
addItemsTo(tabComponent)(tabComponentList, tabComponentBody)

/* ------------------------ */

// PAGE: Amazon button question
const amazonButtonQuesh = document.createElement('div')
amazonButtonQuesh.classList = makeClassName(menuItems[3])

const amButtonArr = []

const initAmazonTest = () => {
	amButtonArr.push(0)
	amButtonArr.forEach((item, idx) => {
		const btn = document.createElement('button')
		btn.innerText = `Count ${item}`
		amazonButtonQuesh.appendChild(btn)

		btn.addEventListener('click', () => {
			amazonButtonQuesh.innerHTML = ''
			amButtonArr[idx] = item + 1
			initAmazonTest()
		})
	})
}

initAmazonTest()

/* --------------------------- */

// MENU ITEMS
menuItems.forEach(item => {
	const className = makeClassName(item)
	const liItem = document.createElement('li')
	liItem.className = 'menu-item'
	const a = document.createElement('a')
	a.href = '#'
	a.innerText = item
	liItem.appendChild(a)
	menu.appendChild(liItem)

	a.addEventListener('click', () => {
		menu.childNodes.forEach(child => {
			child.className = child.innerText === item ? 'menu-item selected' : 'menu-item'
		})

		mainBody.childNodes.forEach(child => {
			child.style.display = child.className == className ? 'block' : 'none'
		})
	})
})

// ADDING ITEMS TO MAIN BODY
addItemsTo(mainBody)(mainInfo, addImages, tabComponent, amazonButtonQuesh)
mainBody.childNodes.forEach(child => child.style.display = 'none')

addItemsTo(root)(header, menu, mainBody)
document.body.appendChild(root)

document.querySelector('.menu-item > a').click()