class OilProductionAppState {
  constructor(callback) {
    this.tokens = [];
    this.currentNumber = "";
    this.callback = callback;
  }

  addDigit(digit) {
    this.currentNumber += digit;
    this.onUpdate();
  }

  addOperation(operation) {
    if (this.currentNumber !== "") {
      this.tokens.push(this.currentNumber);
      this.currentNumber = "";
    }

    switch (operation) {
      case "=":
        console.log(this.tokens);
        break;
      case "C":
        this.clear();
        break;
      default:
        this.tokens.push(operation);
        break;
    }

    this.onUpdate();
  }

  clear() {
    this.tokens = [];
    this.currentNumber = "";
  }

  onUpdate() {
    let currentNumber = "0";
    if (this.currentNumber !== "" || this.tokens.length > 0) {
      currentNumber = this.currentNumber;
    }

    this.callback(this.tokens.join("") + currentNumber);
  }
}

class Button {
  constructor(handler) {
    this.handler = handler;
  }

  withCSSClasses(cssClasses) {
    this.cssClasses = cssClasses;
    return this;
  }

  withLabel(label) {
    this.label = label;
    return this;
  }

  render(containerElement) {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = this.label;

    if (this.cssClasses && this.cssClasses.length > 0) {
      buttonElement.classList.add(...this.cssClasses);
    }

    if (this.handler) {
      buttonElement.addEventListener("click", this.handler);
    }

    containerElement.appendChild(buttonElement);
  }
}

const createButton = (label, handler) => {
  return new Button(handler).withLabel(label).withCSSClasses(["btn"]);
};

const createSecondaryButton = (label, handler) => {
  return new Button(handler)
    .withLabel(label)
    .withCSSClasses(["btn", "secondary"]);
};

const createPrimaryButton = (label, handler) => {
  return new Button(handler)
    .withLabel(label)
    .withCSSClasses(["btn", "primary"]);
};

const createAccentButton = (label, handler) => {
  return new Button(handler)
    .withLabel(label)
    .withCSSClasses(["btn", "btn-long", "accent"]);
};

const logPress = (val) => console.log(`Нажато: ${val}`);

const createResultBoxCallback = () => {
  const resultBox = document.getElementById("result-box");
  return (content) => {
    resultBox.textContent = content;
  };
};

const appState = new OilProductionAppState(createResultBoxCallback());

const oilProductionApp = {
  buttons: [
    // 1-й ряд
    createSecondaryButton("C", () => appState.addOperation("C")),
    createSecondaryButton("±", () => appState.addOperation("±")),
    createSecondaryButton("%", () => appState.addOperation("%")),
    createPrimaryButton("÷", () => appState.addOperation("÷")),

    // 2-й ряд
    createButton("7", () => appState.addDigit("7")),
    createButton("8", () => appState.addDigit("8")),
    createButton("9", () => appState.addDigit("9")),
    createPrimaryButton("×", () => appState.addOperation("×")),

    // 3-й ряд
    createButton("4", () => appState.addDigit("4")),
    createButton("5", () => appState.addDigit("5")),
    createButton("6", () => appState.addDigit("6")),
    createPrimaryButton("-", () => appState.addOperation("-")),

    // 4-й ряд
    createButton("1", () => appState.addDigit("1")),
    createButton("2", () => appState.addDigit("2")),
    createButton("3", () => appState.addDigit("3")),
    createPrimaryButton("+", () => appState.addOperation("+")),

    // 5-й ряд
    createButton("0", () => appState.addDigit("0")),
    createButton(".", () => appState.addDigit(".")),
    createAccentButton("=", () => appState.addOperation("=")),
  ],
};

const viewButtons = (buttons) => {
  const buttonGroup = document.getElementById("button-group");

  buttons.forEach((el) => {
    el.render(buttonGroup);
  });
};

const createModeSwitcher = () => {
  const body = document.body;
  const modeSwitcher = document.getElementById("switcher");

  modeSwitcher.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
  });
};

createModeSwitcher();
viewButtons(oilProductionApp.buttons);
