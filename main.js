const root = document.createElement("div");

// HELPERS
const makeClassName = (str) => str.toLowerCase().split(" ").join("-");

const addItemsTo =
  (mainRoot) =>
  (...items) => {
    items.forEach((item) => {
      mainRoot.appendChild(item);
    });
  };

// TODO: make this class

class Page {
  static pages = [];

  constructor(name) {
    this.name = name;
    el = this.createElement(name);
    Page.pages.push(this);
  }

  createElement(name) {
    const component = document.createElement("div");
    component.classname = this.makeClassName(name);
    return [component, name];
  }

  makeClassName(str) {
    return str.toLowerCase().split(" ").join("-");
  }

  static render() {}

  static get children() {
    return Page.pages;
  }
}

// MAIN SETUP
const header = document.createElement("h1");
header.className = "header";
header.innerText = "JavaScript practice";
const menu = document.createElement("ul");
menu.className = "main-menu";
const mainBody = document.createElement("div");
mainBody.className = "main-body";

/**
 * Build the main component
 * @param {string} name - The name of the component
 */

const makePageComponent = (name) => {
  // if (!name) {
  //   return new Error("Must select a name");
  // }
  const component = document.createElement("div");
  component.classname = makeClassName(name);
  return [component, name];
};

// PAGES
// const menuItems = [
//   "Main Info",
//   "Add images",
//   "Tab component",
//   "Amazon button",
//   "Form practice",
//   "Fake AI Prompt",
// ];

// PAGE: Main info
const mainInfo = makePageComponent("Main Info");
mainInfo[0].innerText = `This is going to be some practice javascript to get ready for my little test thingy`;

// PAGE: add images
const addImages = makePageComponent("Add the Images");
const addImagesButton = document.createElement("button");
const imageList = document.createElement("ul");
imageList.className = "img-list-ul";
addItemsTo(addImages[0])(addImagesButton, imageList);
addImagesButton.innerText = "Get random image";
let i = 0;
const getImage = async () => {
  const data = await fetch("https://picsum.photos/100");
  const img = document.createElement("img");
  img.src = data.url;
  img.alt = `From lorem picsum item ${++i}`;
  const imgItem = document.createElement("li");
  imgItem.appendChild(img);
  imageList.appendChild(imgItem);

  imgItem.addEventListener("dblclick", (e) => {
    imageList.childNodes.forEach((listItem) => {
      const currImg = listItem.childNodes[0].src;
      if (currImg === e.target.src) {
        listItem.remove();
      }
    });
  });
};
addImagesButton.addEventListener("click", getImage);

// PAGE: Tab component
const tabComponent = makePageComponent("Tab Component");

const tcData = [
  {
    title: "Card 1",
    question: "What is the capital of the US?",
    answer: "Washington, DC",
  },
  {
    title: "Card 2",
    question: "What is the capital of CR?",
    answer: "San Jose",
  },
  {
    title: "Card 3",
    question: "lorem???",
    answer: "ipsum",
  },
];

let tcDataIndex = 0;
let isQuestionEnabled = true;

const tabComponentList = document.createElement("ul");
tabComponentList.className = "tc-list";

const tabComponentBody = document.createElement("div");
tabComponentBody.className = "tc-body";

const extraStuff = document.createElement("p");

tcData.forEach((compItem, idx) => {
  const listItem = document.createElement("li");
  listItem.innerText = compItem.title;
  tabComponentList.appendChild(listItem);

  if (idx === 0) {
    listItem.classList.add("selected");
  }

  listItem.addEventListener("click", () => {
    document.querySelectorAll(".tc-list > li").forEach((item) => {
      item.classList.remove("selected");
    });

    listItem.classList.add("selected");
    tcDataIndex = idx;

    tabComponentBody.innerText = tcData[idx].question;
  });
});

tabComponentBody.addEventListener("click", () => {
  isQuestionEnabled = !isQuestionEnabled;
  const isQuestion = isQuestionEnabled ? "question" : "answer";
  tabComponentBody.innerText = tcData[tcDataIndex][isQuestion];
});

tabComponentBody.innerText = tcData[tcDataIndex].question;
addItemsTo(tabComponent[0])(tabComponentList, tabComponentBody);

/* ------------------------ */

// PAGE: Amazon button question
const amazonButtonQuesh = makePageComponent("Amazon button");

const amButtonArr = [];

const initAmazonTest = () => {
  amButtonArr.push(0);
  amButtonArr.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.innerText = `Count ${item}`;
    amazonButtonQuesh[0].appendChild(btn);

    btn.addEventListener("click", () => {
      amazonButtonQuesh.innerHTML = "";
      amButtonArr[idx] = item + 1;
      initAmazonTest();
    });
  });
};

initAmazonTest();

// PAGE: Form stuff

const formPractice = makePageComponent("Form Practice");

let todos = [];
const addButton = document.createElement("button");
const formInput = document.createElement("input");
formInput.type = "text";
formInput.placeholder = "Add to todo";
formInput.width = 200;
const formBody = document.createElement("ul");
formBody.className = "form-body-ul";
const formHeader = document.createElement("div");
formHeader.className = "form-header";
addButton.textContent = "Add";

addItemsTo(formHeader)(formInput, addButton);
addItemsTo(formPractice[0])(formHeader, formBody);

const buildTodos = () => {
  formBody.innerHTML = "";
  todos.forEach((item, idx) => {
    const pTextItem = document.createElement("span");
    pTextItem.textContent = `${item}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.className = "form-remove-button";
    const row = document.createElement("li");
    row.className = "form-row-li";

    removeButton.addEventListener("click", () => {
      todos = todos.filter((item, i) => {
        return i !== idx && item;
      });
      buildTodos();
    });

    addItemsTo(row)(pTextItem, removeButton);
    formBody.appendChild(row);
  });
};

addButton.addEventListener("click", () => {
  if (formInput.value.length) todos.push(formInput.value);

  formInput.value = "";
  buildTodos();
});

// PAGE: Fake AI Prompt
const fakeAIPromp = makePageComponent("Fake AI Prompt");
fakeAIPromp[0].innerText = "Im a fake ai prompt";

/* --------------------------- */

const pages = [
  mainInfo,
  addImages,
  tabComponent,
  amazonButtonQuesh,
  formPractice,
  fakeAIPromp,
];

// MENU ITEMS
pages.forEach((item) => {
  const itemName = item[1];
  const className = makeClassName(itemName);
  const liItem = document.createElement("li");
  liItem.className = "menu-item";
  const a = document.createElement("a");
  a.href = "#";
  a.innerText = itemName;
  liItem.appendChild(a);
  menu.appendChild(liItem);

  a.addEventListener("click", () => {
    menu.childNodes.forEach((child) => {
      child.className =
        child.innerText === itemName ? "menu-item selected" : "menu-item";
    });

    mainBody.childNodes.forEach((child) => {
      child.style.display = child.className == className ? "block" : "none";
    });
  });
});

addItemsTo(mainBody)(...pages.map((page) => page[0]));
mainBody.childNodes.forEach((child) => (child.style.display = "none"));

addItemsTo(root)(header, menu, mainBody);
document.body.appendChild(root);
document.querySelector(".menu-item > a").click();
