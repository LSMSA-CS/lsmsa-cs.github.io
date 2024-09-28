import { users } from "./data/users.js";

const leaderboardList = document.querySelector(".scahoo-leaderboard-list");

const leaderboardItemTemplate = document.querySelector("template.tem-scahoo-leaderboard-item");

export function addLeaderboardItem(item) {
  let leaderboardItemClone = leaderboardItemTemplate.content.firstElementChild.cloneNode(true);
  
  if (item.name) {
    leaderboardItemClone.querySelector(".scahoo-leaderboard-item-name").textContent =
      item.name;
  }
  if (item.descriptor) {
    leaderboardItemClone.querySelector(".scahoo-leaderboard-item-descriptor").textContent =
      item.descriptor;
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
        rank = item.rank
        break;
    }
    leaderboardItemClone.querySelector(".scahoo-leaderboard-item-rank").textContent =
      rank;
  }
  if (item.points) {
    leaderboardItemClone.querySelector(".scahoo-leaderboard-item-points").textContent =
      item.points + " pts";
  }

  leaderboardList.appendChild(leaderboardItemClone);
}

for (let item of users) {
  addLeaderboardItem(item);
  
}
