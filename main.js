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
const menuItems = ['Main info', 'Add images' ]

// MAIN INFO
const mainInfo = document.createElement('div')
mainInfo.className= makeClassName(menuItems[0])
mainInfo.innerText = `This is going to be some practice javascript to get ready for my little test thingy`


// ADD IMAGES
const addImages = document.createElement('div')
addImages.className= makeClassName(menuItems[1])
addImages.innerText = 'This is some temporary inner text'



// MENU ITEMS
menuItems.forEach(item => {
	const className = makeClassName(item)
	const liItem = document.createElement('li')
	const a = document.createElement('a')
	a.href = '#'
	a.innerText = item
	liItem.appendChild(a)
	menu.appendChild(liItem)



	a.addEventListener('click', () => {
		mainBody.childNodes.forEach(child => {
			if(child.className == className)
				child.style.display = 'block'
			else 
				child.style.display = 'none'
		})

		// console.log('ITEM', mainBodyItem.innerText)

	})
})

addItemsTo(mainBody)(mainInfo, addImages)
mainBody.childNodes.forEach(child => child.style.display = 'none')

addItemsTo(root)(header, menu, mainBody)

document.body.appendChild(root);
