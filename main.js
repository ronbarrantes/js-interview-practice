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

    // This clicks on the first item making the first page appear on screen
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
// PAGE: game of life

const gameOfLife = new Page("Game of Life");
// gameOfLife.innerText = "Game of life";

// HELPERS
const golRandomNumber = () => {
  return Math.floor(Math.random() * 2);
};

const initData = (rows, cols) => {
  const tempBoard = [];

  for (let row = 0; row < rows; row++) {
    const tempRows = [];

    for (let col = 0; col < cols; col++) {
      const newCell = golRandomNumber();
      tempRows.push(newCell);
    }
    tempBoard.push(tempRows);
  }

  return tempBoard;
};

const buildBoard = (boardData) => {
  const squareSize = "10px";
  const spans = [];
  boardData.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.style.display = "flex";
    row.forEach((cell) => {
      const cellEl = document.createElement("span");
      cellEl.style.display = "block";
      cellEl.style.width = squareSize;
      cellEl.style.height = squareSize;
      cellEl.style.background = cell === 1 ? "black" : "white";
      addItemsTo(rowEl)(cellEl);
    });

    spans.push(rowEl);
  });

  return spans;
};

const cellChecker = (board, row, col) => {
  // check if cell is alive
  const rowsCount = board.length;
  const colsCount = board[0].length;
  let isAlive = board[row][col] === 1;
  let neighborCount = 0;

  // find the neighbor count
  for (let rowNb = row - 1; rowNb < row - 1 + 3; rowNb++) {
    for (let colNb = col - 1; colNb < col - 1 + 3; colNb++) {
      if (
        (rowNb === row && colNb === col) ||
        rowNb < 0 ||
        colNb < 0 ||
        rowNb >= rowsCount ||
        colNb >= colsCount
      ) {
        continue;
      }
      neighborCount += board[rowNb][colNb];
    }
  }

  // RULES
  // dead cell with 3 neighbors turns alive
  if (!isAlive && neighborCount === 3) return 1;
  // 2 or 3 neighbors lives
  if (isAlive && (neighborCount === 2 || neighborCount === 3)) return 1;
  // everything else dies
  return 0;
};

let boardData = initData(10, 10);

let isPaused = false;

const board = document.createElement("div");

addItemsTo(board)(...buildBoard(boardData));

board.className = "game-of-life-board";
const golPauseButton = document.createElement("button");
const golChangeButton = document.createElement("button");
const golRowInput = document.createElement("input");
const golColInput = document.createElement("input");
const counterTracker = document.createElement("p");
let counter = 0;
counterTracker.innerText = `Generation 0`;

golRowInput.type = "text";
golRowInput.placeholder = "Rows...";
golRowInput.value = 10;
golColInput.type = "text";
golColInput.placeholder = "Columns...";
golChangeButton.textContent = "change";
golColInput.value = 10;

const golForm = document.createElement("form");
golChangeButton.addEventListener("click", () => {
  const rowInput = +golRowInput.value;
  const colInput = +golColInput.value;

  if (rowInput > 100 || colInput > 100) {
    alert("Please keep the inputs below 100");
    return;
  }

  boardData = initData(rowInput, colInput);
  board.innerHTML = "";
  counter = 0;
  counterTracker.innerText = `Generation ${counter}`;
  addItemsTo(board)(...buildBoard(boardData));
});

addItemsTo(golForm)(golRowInput, golColInput, golChangeButton, golPauseButton);
addItemsTo(gameOfLife)(golForm, counterTracker, board);

const nextGenData = (boardData) => {
  const tempBoard = [];
  for (let row = 0; row < boardData.length; row++) {
    const tempRows = [];

    for (let col = 0; col < boardData[0].length; col++) {
      const newCell = cellChecker(boardData, row, col);
      tempRows.push(newCell);
    }
    tempBoard.push(tempRows);
  }

  return tempBoard;
};

golPauseButton.textContent = isPaused ? "stop" : "start";

golPauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  golPauseButton.textContent = isPaused ? "stop" : "start";

  const interval = setInterval(() => {
    if (!isPaused) {
      clearInterval(interval);
    } else {
      const tempData = nextGenData(boardData);
      boardData = tempData;
      board.innerHTML = "";
      addItemsTo(board)(...buildBoard(boardData));
      counterTracker.innerText = `Generation ${counter}`;
      counter++;
    }
  }, 100);

  console.log("DONE");
});

/* --------------------------- */
// // PAGE: Fake AI Prompt
// const fakeAIPromp = new Page("Fake AI Prompt");
// fakeAIPromp.innerText = "Im a fake ai prompt";

/* --------------------------- */
/// RENDER THE PAGE ////
Page.render();

const liItem =
  document.getElementsByClassName("menu-item")[Page.children.length - 1];
liItem.children[0].click();
