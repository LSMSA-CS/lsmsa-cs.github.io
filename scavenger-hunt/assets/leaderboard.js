import { hunt } from "./data/hunt.js";
import { users, usersTest } from "./data/users.js";

let usersList = users;

// Uncomment out for debugging
// usersList = usersTest;

const leaderboardList = document.querySelector(".scahoo-leaderboard-list");
const leaderboardItemTemplate = document.querySelector(
  "template.tem-scahoo-leaderboard-item"
);

if (hunt.info.title) {
  document.querySelector(".scahoo-leaderboard-title").innerText = hunt.info.title;
}

export function addLeaderboardItem(item) {
  let leaderboardItemClone =
    leaderboardItemTemplate.content.firstElementChild.cloneNode(true);

  if (item.name) {
    leaderboardItemClone.querySelector(
      ".scahoo-leaderboard-item-name"
    ).textContent = item.name;
  }
  if (item.descriptor) {
    leaderboardItemClone.querySelector(
      ".scahoo-leaderboard-item-descriptor"
    ).textContent = item.descriptor;
  }
  if (item.rank) {
    let rank;
    switch (item.rank) {
      case 1:
        rank = "🥇";
        break;
      case 2:
        rank = "🥈";
        break;
      case 3:
        rank = "🥉";
        break;
      default:
        rank = item.rank;
        break;
    }
    leaderboardItemClone.querySelector(
      ".scahoo-leaderboard-item-rank"
    ).textContent = rank;
  }
  if (item.points) {
    leaderboardItemClone.querySelector(
      ".scahoo-leaderboard-item-points"
    ).textContent = item.points + " pts";
  }

  leaderboardList.appendChild(leaderboardItemClone);
}

if (usersList.length > 0) {
  for (let item of usersList) {
    addLeaderboardItem(item);
  }
} else {
  const element = document.createElement("p");
  const node = document.createTextNode("Nobody here yet!");
  element.classList.add("scahoo-leaderboard-items-placeholder");
  element.appendChild(node);

  leaderboardList.appendChild(element);
}
