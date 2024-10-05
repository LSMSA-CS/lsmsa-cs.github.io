const board = document.querySelector(".scahoo-board");

const categoryTemplate = document.querySelector("template.tem-scahoo-category");
const cardTemplate = document.querySelector("template.tem-scahoo-board-card");
const taskTemplate = document.querySelector("template.tem-scahoo-board-task");

export function addCategory(category) {
  let categoryClone =
    categoryTemplate.content.firstElementChild.cloneNode(true);

  if (category.id) {
    categoryClone.id = category.id;
  }
  if (!category.name || category.name == "NONE") {
    categoryClone.querySelector(".scahoo-category h3").textContent =
      "Cards";

  } else if (category.name) {
    categoryClone.querySelector(".scahoo-category h3").textContent =
      category.name;
  }

  board.appendChild(categoryClone);
}

export function addCard(card, category) {
  const categoryCards = board
    .querySelector("#" + category.id)
    .querySelector(".scahoo-category-cards");

  // requires .firstElementChild to turn DocumentFragment to HTMLElement
  let cardClone = cardTemplate.content.firstElementChild.cloneNode(true);

  // if statements allow setting default values in the templates, if nothing is inputted
  if (card.id) {
    cardClone.id = card.id;
  }
  if (card.skills) {
    cardClone.querySelector(".scahoo-board-card-kicker span").textContent = card.skills;
  }
  if (card.name) {
    cardClone.querySelector(".scahoo-board-card-title h4").textContent = card.name;
  }
  if (card.description) {
    cardClone.querySelector(".scahoo-board-card-description span").textContent =
      card.description;
  }
  if (card.icon) {
    cardClone
      .querySelector(".scahoo-board-card-icon i")
      .setAttribute("data-lucide", card.icon);
  }

  categoryCards.appendChild(cardClone);

  lucide.createIcons();
}

export function addTask(task, card) {
  const cardTasks = board
    // .querySelector("#" + category.id)
    // .querySelector(".scahoo-category-cards")
    .querySelector("#" + card.id)
    .querySelector(".scahoo-board-tasks");

  let taskClone = taskTemplate.content.firstElementChild.cloneNode(true);

  if (task.id) {
    taskClone.id = task.id;
  }
  if (task.name) {
    taskClone.querySelector(".scahoo-board-task-content-name").textContent = task.name;
  }
  // if (task.group) {
  //   taskClone.querySelector(".scahoo-board-task-content-group").textContent =
  //     toTitleCase(task.group.discriminator) + " " + task.group.value;
  // }
  if (task.group) {
    taskClone.querySelector(".scahoo-board-task-group").textContent =
      toTitleCase(task.group.discriminator) + " " + task.group.value;
  }
  if (task.points) {
    taskClone.querySelector(".scahoo-board-task-points").textContent =
      task.points + " pts";
  }

  cardTasks.appendChild(taskClone);

  lucide.createIcons();
}

export function drawBoard(tasks) {
  let categories = tasks.categories;

  for (let category of categories) {
    addCategory(category);
    for (let card of category.cards) {
      addCard(card, category);
      for (let task of card.tasks) {
        addTask(task, card);
      }
    }
  }
}

// ---

function toTitleCase(str) {
  return str.replace(
    /\b\w+/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
