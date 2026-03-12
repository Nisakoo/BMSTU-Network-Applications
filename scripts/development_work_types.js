"use strict";

const extractOil = (current, extracted) => current + extracted;
const spillOil = (current, spilled) => current - spilled;
const findNewOilFields = (current, oilFieldsCount) => current * oilFieldsCount;
const deleteOilFields = (current, oilFieldsCount) =>
  Math.round(current / oilFieldsCount);
const findSalesTax = (profit, tax) => Math.round(profit * (1 - tax / 100));
const lobbyForLaw = (profit) => Math.round(2 * Math.random() * profit);

class OilProductionApp {
  constructor(callback) {
    this.tokens = [];
    this.currentNumber = "";
    this.callback = callback;

    this.operations = {
      "+": { prec: 1, isBinary: true },
      "-": { prec: 1, isBinary: true },
      "×": { prec: 2, isBinary: true },
      "÷": { prec: 2, isBinary: true },
      "%": { prec: 2, isBinary: true },
      "?": { prec: 3, isBinary: false },
    };

    this.onUpdate();
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
        this.currentNumber = String(this.getProfitFromOilSale(this.buildRPN()));
        this.tokens = [];
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

  buildRPN() {
    const output = [];
    const stack = [];

    for (const token of this.tokens) {
      if (!isNaN(parseFloat(token))) {
        output.push(parseFloat(token));
      } else if (this.operations[token]) {
        while (
          stack.length > 0 &&
          this.operations[stack[stack.length - 1]].prec >=
            this.operations[token].prec
        ) {
          output.push(stack.pop());
        }

        stack.push(token);
      }
    }

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    return output;
  }

  getProfitFromOilSale(rpn) {
    const stack = [];

    for (const token of rpn) {
      if (Number.isFinite(token)) {
        stack.push(token);
      } else if (this.operations[token]) {
        let right = stack.pop();
        let left = 0;

        if (this.operations[token].isBinary) {
          left = stack.pop();
        }

        switch (token) {
          case "+":
            stack.push(extractOil(left, right));
            break;
          case "-":
            stack.push(spillOil(left, right));
            break;
          case "×":
            stack.push(findNewOilFields(left, right));
            break;
          case "÷":
            stack.push(deleteOilFields(left, right));
            break;
          case "%":
            stack.push(findSalesTax(left, right));
            break;
          case "?":
            stack.push(lobbyForLaw(right));
            break;
          default:
            stack.push(extractOil(left, right));
            break;
        }
      }
    }

    if (stack.length > 0) {
      return stack[0];
    }

    return 0;
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

  withTooltip(text) {
    this.tooltipText = text;
    return this;
  }

  render(containerElement) {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = this.label;

    if (this.tooltipText) {
      buttonElement.title = this.tooltipText;
    }

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

const createLobbyForLawButton = (label, handler) => {
  return new Button(handler)
    .withLabel(label)
    .withCSSClasses(["btn", "btn-lobby-for-law", "primary"]);
};

const createResultBoxCallback = () => {
  const resultBox = document.getElementById("result-box");
  return (content) => {
    resultBox.textContent = content;
  };
};

const app = new OilProductionApp(createResultBoxCallback());

const oilProductionInterface = {
  buttons: [
    // 1-й ряд
    createSecondaryButton("C", () => app.addOperation("C")).withTooltip(
      "Очистить",
    ),
    createSecondaryButton("000", () => app.addDigit("000")).withTooltip(
      "Увеличить поставки",
    ),
    createSecondaryButton("%", () => app.addOperation("%")).withTooltip(
      "Найти налог от продажи",
    ),
    createPrimaryButton("÷", () => app.addOperation("÷")).withTooltip(
      "Истощить месторождения нефти",
    ),

    // 2-й ряд
    createButton("7", () => app.addDigit("7")),
    createButton("8", () => app.addDigit("8")),
    createButton("9", () => app.addDigit("9")),
    createPrimaryButton("×", () => app.addOperation("×")).withTooltip(
      "Разведать месторождения нефти",
    ),

    // 3-й ряд
    createButton("4", () => app.addDigit("4")),
    createButton("5", () => app.addDigit("5")),
    createButton("6", () => app.addDigit("6")),
    createPrimaryButton("-", () => app.addOperation("-")).withTooltip(
      "Пролить нефть",
    ),

    // 4-й ряд
    createButton("1", () => app.addDigit("1")),
    createButton("2", () => app.addDigit("2")),
    createButton("3", () => app.addDigit("3")),
    createPrimaryButton("+", () => app.addOperation("+")).withTooltip(
      "Добыть нефть",
    ),

    // 5-й ряд
    createButton("0", () => app.addDigit("0")),
    createButton(".", () => app.addDigit(".")),
    createAccentButton("=", () => app.addOperation("=")).withTooltip(
      "Посчитать прибыль",
    ),

    // Индивидуальные кнопки
    createLobbyForLawButton("Лоббировать", () =>
      app.addOperation("?"),
    ).withTooltip("Лоббировать закон"),
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
viewButtons(oilProductionInterface.buttons);
