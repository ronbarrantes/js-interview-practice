// Add an div element to the DOM
const root = document.createElement('div');
// create a menu for the pages that I'm going to be writing
// swap items via the menu to a new practice item


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
const menuItems = ['Main info', 'Add images', 'Tab component', 'Index card component' ]

// PAGE: Main info
const mainInfo = document.createElement('div')
mainInfo.className= makeClassName(menuItems[0])
mainInfo.innerText = `This is going to be some practice javascript to get ready for my little test thingy`


// PAGE: add images
const addImages = document.createElement('div')
addImages.className= makeClassName(menuItems[1])
const addImagesButton = document.createElement('button')
const imageList = document.createElement('ul')
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
tabComponent.innerText = 'The tab component will feature menu items and will display one single item from the tab'


// PAGE: Index card component
const indexCardComponent = document.createElement('div')
indexCardComponent.classList = makeClassName(menuItems[3])
indexCardComponent.innerText = 'This will be similar to a index card, it will have some animation thingy (maybe)'

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
addItemsTo(mainBody)(mainInfo, addImages, tabComponent, indexCardComponent)
mainBody.childNodes.forEach(child => child.style.display = 'none')

addItemsTo(root)(header, menu, mainBody)
document.body.appendChild(root);

document.querySelector('.menu-item > a').click()