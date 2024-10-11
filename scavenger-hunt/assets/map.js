import { map } from "./data/map.js";

// var mapElement = L.map('scahoo-leaflet-map').setView([31.752353, -93.097259], 19);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   minZoom: 17,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(mapElement);


// --- CREATE MAP ---

let defaultPosition = [-24, -16];

let imageDimensions = [5671, 3617];
let imageWidth = 512;
let imageBounds = [
  [0, 0],
  [imageDimensions[1] / (imageDimensions[0] / imageWidth), imageWidth],
];
// Center the image
imageBounds = [
  [
    imageBounds[0][0] - imageBounds[1][0] / 2,
    imageBounds[0][1] - imageBounds[1][1] / 2,
  ],
  [
    imageBounds[1][0] - imageBounds[1][0] / 2,
    imageBounds[1][1] - imageBounds[1][1] / 2,
  ],
];

var mapElement = L.map("scahoo-leaflet-map", {
  crs: L.CRS.Simple,
  center: [-24, -16],
  zoom: 3,
  maxZoom: 5,
  minZoom: 1,
  maxBounds: imageBounds.map((x) => x.map((y) => y * 2)),
});

var imageUrl = "../assets/data/map.png";

// --- MAP CONTROLS ---

mapElement.attributionControl.addAttribution(
  '<span>&copy;</span> <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
);
L.imageOverlay(imageUrl, imageBounds).addTo(mapElement);

L.Control.Home = L.Control.extend({
  onAdd: function (map) {
    var home = document.createElement("a");
    home.style.height = "30px";
    home.style.width = "30px";

    home.innerHTML = "<i data-lucide='house' style='width: 18px;'></i>";
    home.style.display = "flex";
    home.style["align-items"] = "center";
    home.style["justify-content"] = "center";

    home.setAttribute("role", "button");
    home.style.cursor = "pointer";
    home.setAttribute("title", "Go to default view");

    home.addEventListener("click", (e) => {
      mapElement.setView(defaultPosition, 3);
    });

    var group = L.DomUtil.create("div");
    group.appendChild(home);

    group.classList.add("leaflet-bar");

    return group;
  },

  onRemove: function (map) {
    // Nothing to do here
  },
});

L.control.home = function (opts) {
  return new L.Control.Home(opts);
};

L.control.home({ position: "topleft" }).addTo(mapElement);
lucide.createIcons();

// --- MAP OBJECTS ---

drawMapObjects();
function drawMapObjects() {
  for (const object of map.objects) {
    console.log(object);
  }
}

let table = [
  [-0.5, -1],
  [-0.5, 1],
  [0.5, 1],
  [0.5, -1],
];

// var polygon = L.polygon(table, {
//   fillColor: "#fff",
//   fillOpacity: 1,
//   color: "#aaa",
//   weight: 2,
// }).addTo(mapElement);
// polygon.bindPopup("I am a polygon.");
// mapElement.fitBounds(polygon.getBounds());

// mapElement.addEventListener("zoom", (e) => {
//   mapElement.setView([0, 0], 5, {
//     animate: false,
//     easeLinearity: 0,
//     duration: 0,
//   });
// });

// mapElement.fitBounds([[0, 0], [512, 512]]);

// --- old other map thing ---

// import Map from "./modules/v10.2.1-package/Map.js";
// import OSM from "./modules/v10.2.1-package/source/OSM.js";
// import TileLayer from "./modules/v10.2.1-package/layer/Tile.js";
// import View from "./modules/v10.2.1-package/View.js";

// // import './style.css';
// // import Map from 'ol/Map.js';
// // import OSM from 'ol/source/OSM.js';
// // import TileLayer from 'ol/layer/Tile.js';
// // import View from 'ol/View.js';

// const map = new Map({
//   target: 'scahoo-leaflet-map',
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2,
//   }),
// });

// --- ROTATE ---

// Credit to https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point#answer-13208761
function rotatePoint(pointX, pointY, originX, originY, angle) {
  angle = (angle * Math.PI) / 180.0;
  return {
    x:
      Math.cos(angle) * (pointX - originX) -
      Math.sin(angle) * (pointY - originY) +
      originX,
    y:
      Math.sin(angle) * (pointX - originX) +
      Math.cos(angle) * (pointY - originY) +
      originY,
  };
}

// --- MAP HEIGHT ---

const resizeObserver = new ResizeObserver((entries) => {
  // console.log("Body height changed:", entries[0].target.clientHeight);
  updateMapHeight();
});
resizeObserver.observe(document.body);

document.addEventListener("scroll", updateMapHeight);
document
  .querySelector("input[type=checkbox].scahoo-instructions-checkbox")
  .addEventListener("change", updateMapHeight);

function updateMapHeight() {
  let maxHeight = window.innerHeight - 32;
  let marginBottom = 16;

  let instructionsHeight = 0;
  if (
    document.querySelector(".scahoo-instructions-checkbox").checked &&
    window.innerWidth <= 992
  ) {
    instructionsHeight =
      document.querySelector(".scahoo-instructions").clientHeight + 32;
  }

  let heightOffset =
    document.querySelector("nav").clientHeight +
    document.querySelector(".scahoo-info").clientHeight +
    document.querySelector(".scahoo-tabs").clientHeight +
    instructionsHeight;
  // console.log(heightOffset);
  let marginOffset = 0;

  let scahooMapContentHeight =
    window.innerHeight - (heightOffset - window.scrollY + marginBottom + 24);
  if (scahooMapContentHeight > maxHeight) {
    marginOffset = window.scrollY - heightOffset - 8;
    console.log(marginOffset);
    scahooMapContentHeight = maxHeight - marginOffset;
  }

  document
    .querySelector(":root")
    .style.setProperty("--scrollPosition", window.scrollY + "px");
  document
    .querySelector(":root")
    .style.setProperty(
      "--scahooMapContentHeight",
      scahooMapContentHeight + "px"
    );
  document
    .querySelector(":root")
    .style.setProperty("--scahooMapContentTop", marginOffset + "px");
}
