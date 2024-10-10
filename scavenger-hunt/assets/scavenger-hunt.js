import { hunt } from "./data/hunt.js";

const idPrefixes = {
  h: "hunt",
  u: "user",
  g: "category",
  c: "card",
  t: "task",
};

const tabOrder = ["board", "map", "leaderboard", "about"];

const tabDefinitions = {
  board: {
    name: "Board",
    icon: "layout-grid",
    href: "/scavenger-hunt/board",
  },
  map: {
    name: "Map",
    icon: "map",
    href: "/scavenger-hunt/map/",
  },
  leaderboard: {
    name: "Leaderboard",
    icon: "trophy",
    href: "/scavenger-hunt/leaderboard/",
  },
  about: {
    name: "About",
    icon: "info",
    href: "/scavenger-hunt/about/",
    // disabled: true,
  },
};
const tabTemplate = document.querySelector("template.tem-scahoo-tab");

let currentTab;
try {
  currentTab = document
    .querySelector("#scahoo-current-tab")
    .getAttribute("content");
} catch (TypeError) {
  currentTab = "board";
}

// --- COLOR SCHEME ---

document.querySelectorAll("#color-scheme-switcher").forEach((element) => {
  element.addEventListener("click", cycleColorMode);
});

document.querySelectorAll("body").forEach((element) => {
  element.addEventListener("load", refreshColorScheme());
  element.addEventListener("load", setupInfo());
  element.addEventListener("load", enableTransitions());
  element.addEventListener("load", setupTabs());
});

// --- SCAHOO INFO ---

function setupInfo() {
  if (hunt.info.title) {
    document.querySelector(".scahoo-info-title").innerText = hunt.info.title;
  }
  if (hunt.info.description) {
    document.querySelector(".scahoo-info-description p").innerText =
      hunt.info.description;
  }
  if (hunt.tabs) {
    // If about tab is enabled and not currently on about tab
    if (hunt.tabs["about"] == true && currentTab != "about") {
      document
        .querySelector(".scahoo-info-description")
        .setAttribute("href", "../about/");
    }
  }
}

// --- TABS ---

function setupTabs() {
  if (hunt.tabs) {
    if (hunt.tabs[currentTab] == false) {
      for (let i of tabOrder) {
        if (hunt.tabs[i] == true) {
          // Redirect to first enabled tab
          window.location.replace(tabDefinitions[i].href);
          break;
        }
      }
    }

    for (let i of tabOrder) {
      // If hunt.tabs has invalid tab, it is skipped
      if (tabDefinitions[i] == undefined) {
        continue;
      }

      if (hunt.tabs[i]) {
        let tabClone = tabTemplate.content.firstElementChild.cloneNode(true);
        if (tabDefinitions[i].name) {
          tabClone.querySelector(".scahoo-tab-name").textContent =
            tabDefinitions[i].name;
        }
        if (tabDefinitions[i].icon) {
          tabClone
            .querySelector(".scahoo-tab-icon i")
            .setAttribute("data-lucide", tabDefinitions[i].icon);
        }
        if (tabDefinitions[i].disabled == true) {
          tabClone.classList.add("disabled");
        } else {
          // only add href if tab isn't disabled
          if (tabDefinitions[i].href) {
            // Clicking on selected tab should go to #content
            if (i != currentTab) {
              tabClone.setAttribute("href", tabDefinitions[i].href);
            } else {
              tabClone.setAttribute("href", "#content");
            }
          }
        }

        if (i == currentTab) {
          tabClone.classList.add("selected");
        }

        document.querySelector(".scahoo-tabs .inner").appendChild(tabClone);
        lucide.createIcons();
      }
    }
  }
}

// --- TAB BAR ---

// not necessary anymore, can be removed
document.querySelectorAll(".scahoo-tab:not(.disabled)").forEach((element) => {
  element.addEventListener("click", function (e) {
    if (this.getAttribute("href")) {
      window.location.href = this.getAttribute("href");
    } else {
      if (
        confirm(
          "Uh oh, this tab hasn't been setup! Would you like to return to the main Scavenger Hunt page?"
        )
      ) {
        window.location.href = "/scavenger-hunt";
      }
    }
  });
});

// --- BODY BACKGROUND COLOR ---
// Must be placed below SCAHOO INFO

// CREDIT: https://ryanmulligan.dev/blog/sticky-header-scroll-shadow/

const body = document.querySelector("body");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
body.before(scrollWatcher);

let topSectionHeight =
  document.querySelector("#main-navbar").offsetHeight +
  document.querySelector(".scahoo-info").offsetHeight +
  document.querySelector(".scahoo-tabs").offsetHeight -
  1; // Subtract 1px to allow for #content anchor to work

const navObserver = new IntersectionObserver(
  (entries) => {
    body.classList.toggle("sticking", !entries[0].isIntersecting);
  },
  { rootMargin: topSectionHeight + "px 0px 0px 0px" }
);

navObserver.observe(scrollWatcher);

// --- ENABLE TRANSITIONS ON BODY CHILDREN ---

function enableTransitions() {
  setTimeout(() => {
    document.querySelectorAll(".stop-transitions").forEach((element) => {
      element.classList.remove("stop-transitions");
    });
  }, 10);
}

// --- OPEN/CLOSE INSTRUCTIONS PANEL ---

let instructionsPanelClosed;
instructionsPanelClosed = window.localStorage.getItem(
  "instructionsPanelClosed"
);
try {
  instructionsPanelClosed = JSON.parse(instructionsPanelClosed);
} catch (SyntaxError) {
  instructionsPanelClosed = {
    board: false,
    leaderboard: false,
    map: false,
  };
}

// Update checkbox on load
document.querySelector(".scahoo-instructions-checkbox").checked =
  !instructionsPanelClosed[currentTab];

// Store checkbox when changed
document
  .querySelector("input[type=checkbox].scahoo-instructions-checkbox")
  .addEventListener("change", function () {
    instructionsPanelClosed[currentTab] = !this.checked;
    window.localStorage.setItem(
      "instructionsPanelClosed",
      JSON.stringify(instructionsPanelClosed)
    );
  });
