import { hunt } from "./data/hunt.js";

function updateDescription() {
  if (hunt.info.description) {
    document.querySelector(".scahoo-about-description-text").innerText =
      hunt.info.description;
  } else {
    document.querySelector(".scahoo-about-description-text").innerHTML = "<span style='color: var(--text-secondary); font-style: italic;'>No description provided</span>"
  }
}

function updateAuthor() {
  if (hunt.info.author.name) {
    document.querySelector(".scahoo-about-author-name").innerText =
      hunt.info.author.name;
  }
  if (hunt.info.author.descriptor) {
    document.querySelector(".scahoo-about-author-descriptor").innerText =
      hunt.info.author.descriptor;
  }
}

function updateDetails() {
  if (hunt.info.timeDue) {
    const d = new Date(hunt.info.timeDue * 1000);
    document.querySelector(
      "#scahoo-about-details-timeDue"
    ).lastElementChild.innerText = formatDate(d, true);
    document
      .querySelector("#scahoo-about-details-timeDue")
      .lastElementChild.setAttribute("title", formatDate(d, true, true));
  }
  if (hunt.info.timeLastUpdated) {
    const d = new Date(hunt.info.timeLastUpdated * 1000);
    document.querySelector(
      "#scahoo-about-details-timeLastUpdated"
    ).lastElementChild.innerText = formatDate(d, true);
    document
      .querySelector("#scahoo-about-details-timeLastUpdated")
      .lastElementChild.setAttribute("title", formatDate(d, true, true));
  }
  if (hunt.info.timeReleased) {
    const d = new Date(hunt.info.timeReleased * 1000);
    document.querySelector(
      "#scahoo-about-details-timeReleased"
    ).lastElementChild.innerText = formatDate(d, false, true);
    document
      .querySelector("#scahoo-about-details-timeReleased")
      .lastElementChild.setAttribute("title", formatDate(d, true, true));
  }
  if (hunt.info.version) {
    document.querySelector(
      "#scahoo-about-details-version"
    ).lastElementChild.innerText = hunt.info.version;
  }
  if (hunt.info.id) {
    document.querySelector(
      "#scahoo-about-details-id"
    ).lastElementChild.innerText = hunt.info.id;
  }
}

updateDescription();
updateAuthor();
updateDetails();

function formatDate(d, includeTime, includeDay) {
  includeTime = includeTime != undefined ? includeTime : true;
  includeDay = includeDay != undefined ? includeDay : true;

  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() % 100}`;
  let time = "";
  let day = "";

  if (includeTime) {
    time = `, ${d.getHours() % 12}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )} ${d.getHours() % 12 == 0 ? "AM" : "PM"}`;
  }
  if (includeDay) {
    day = days[d.getDay()] + ", ";
  }

  return day + date + time;
}
