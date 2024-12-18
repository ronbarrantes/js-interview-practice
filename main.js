const addItemsTo =
  (mainRoot) =>
  (...items) => {
    if (!items) return;
    items.forEach((item) => {
      mainRoot.appendChild(item);
    });
  };

class Page {
  static pages = [];

  constructor(name) {
    this.name = name;
    this.element = this._createElement();
    this.className = this._makeClassName();
    Page.pages.push(this);
    return this.element;
  }

  _createElement() {
    const comp = document.createElement("div");
    comp.className = this._makeClassName(this.name);
    return comp;
  }

  _makeClassName() {
    return this.name.toLowerCase().split(" ").join("-");
  }

  static get children() {
    return Page.pages;
  }

  static _createHeader() {}

  static _createNav() {}

  static _createMainBody() {}

  static render() {
    const root = document.createElement("div");
    // MAIN SETUP
    const header = document.createElement("h1");
    header.className = "header";
    header.innerText = "JavaScript practice";
    const menu = document.createElement("ul");
    menu.className = "main-menu";
    const mainBody = document.createElement("div");
    mainBody.className = "main-body";

    // MENU ITEMS
    Page.pages.forEach((item) => {
      const liItem = document.createElement("li");
      liItem.className = "menu-item";
      const aEl = document.createElement("a");
      aEl.href = "#";
      aEl.innerText = item.name;
      liItem.appendChild(aEl);
      menu.appendChild(liItem);

      aEl.addEventListener("click", () => {
        menu.childNodes.forEach((child) => {
          child.className =
            child.innerText === item.name ? "menu-item selected" : "menu-item";
        });

        mainBody.childNodes.forEach((child) => {
          child.style.display =
            child.className == item.className ? "block" : "none";
        });
      });
    });

    addItemsTo(mainBody)(...Page.pages.map((item) => item.element));
    mainBody.childNodes.forEach((child) => (child.style.display = "none"));

    addItemsTo(root)(header, menu, mainBody);
    document.body.appendChild(root);
    document.querySelector(".menu-item > a").click();
  }
}

/* ------------------------ */
// PAGE: Main info
const mainInfo = new Page("Main Info");
mainInfo.innerText = `This is going to be some practice javascript to get ready for my little test thingy`;

/* ------------------------ */
// PAGE: add images
const addImages = new Page("Add the Images");
const addImagesButton = document.createElement("button");
const imageList = document.createElement("ul");
imageList.className = "img-list-ul";

addItemsTo(addImages)(addImagesButton, imageList);
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

/* ------------------------ */
// PAGE: Tab component
const tabComponent = new Page("Tab Component");

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
addItemsTo(tabComponent)(tabComponentList, tabComponentBody);

/* ------------------------ */
// PAGE: Amazon button question
const amazonButtonQuesh = new Page("Amazon button");

const amButtonArr = [];

const initAmazonTest = () => {
  amButtonArr.push(0);
  amButtonArr.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.innerText = `Count ${item}`;
    amazonButtonQuesh.appendChild(btn);

    btn.addEventListener("click", () => {
      amazonButtonQuesh.innerHTML = "";
      amButtonArr[idx] = item + 1;
      initAmazonTest();
    });
  });
};

initAmazonTest();

/* --------------------------- */
// // PAGE: Form stuff
const formPractice = new Page("Form Practice");

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
addItemsTo(formPractice)(formHeader, formBody);

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

/* --------------------------- */
// PAGE: Fake AI Prompt
const fakeAIPromp = new Page("Fake AI Prompt");
fakeAIPromp.innerText = "Im a fake ai prompt";

Page.render();
