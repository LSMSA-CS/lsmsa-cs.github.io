let validSchemes = ["light", "dark"];

let validModes = ["auto"].concat(validSchemes);

let colorScheme;
let schemeMode;
schemeMode = window.localStorage.getItem("schemeMode");
if (!schemeMode) schemeMode = "dark"; // Default scheme

if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      if (schemeMode == "auto") {
        refreshColorScheme();
      }
    });
}

// ---

function setupColorScheme() {
  document.querySelectorAll("#color-scheme-switcher").forEach((element) => {
    element.addEventListener("click", cycleColorMode);
  });
  refreshColorScheme();
  setTimeout(() => {
    document.querySelectorAll(".stop-transitions").forEach((element) => {
      element.classList.remove("stop-transitions");
    });
  }, 10);
}

function refreshColorScheme() {
  updateColorScheme(schemeMode);
  storeColorMode();
  updatePageColorScheme(colorScheme);
  updateColorSchemeIcons(schemeMode);

  // console.log("Mode, Scheme: " + schemeMode + " " + colorScheme);
}

// ---

function cycleColorMode() {
  if (schemeMode == undefined) {
    schemeMode = "auto";
  } else {
    // Cycles schemeMode through validModes
    schemeMode =
      validModes[(validModes.indexOf(schemeMode) + 1) % validModes.length];
  }
  refreshColorScheme(schemeMode);
}

// ---

function updateColorScheme(mode) {
  if (mode == "auto") {
    if (window.matchMedia) {
      colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  } else {
    colorScheme = mode;
  }
}

function storeColorMode() {
  let key = "schemeMode";
  let value = schemeMode;

  window.localStorage.setItem(key, value);
}

function updatePageColorScheme(scheme) {
  document.querySelectorAll(".color-scheme").forEach((element) => {
    element.setAttribute("disabled", "");
  });
  switch (scheme) {
    case "light":
      document.querySelector("#color-scheme-light").removeAttribute("disabled");
      break;
    case "dark":
      document.querySelector("#color-scheme-dark").removeAttribute("disabled");
      break;
    default:
      break;
  }
}

function updateColorSchemeIcons(mode) {
  document.querySelectorAll("#color-scheme-switcher svg").forEach((element) => {
    element.classList.add("color-scheme-switcher-hidden");
  });
  switch (mode) {
    case "auto":
      document
        .querySelector(".color-scheme-icon-auto")
        .classList.remove("color-scheme-switcher-hidden");
      break;
    case "light":
      document
        .querySelector(".color-scheme-icon-light")
        .classList.remove("color-scheme-switcher-hidden");
      break;
    case "dark":
      document
        .querySelector(".color-scheme-icon-dark")
        .classList.remove("color-scheme-switcher-hidden");
      break;

    default:
      break;
  }
}
