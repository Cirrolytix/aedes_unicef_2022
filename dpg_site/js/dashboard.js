let mySidebar = document.getElementById("mySidebar");
let overlayBg = document.getElementById("myOverlay");

function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = "block";
    overlayBg.style.display = "block";
  }
}

function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

function switchTab(tabName) {
  let i;
  let x = document.getElementsByClassName("content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

function separator(number) {
  let str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

let regionsDict = {
  1: [9, 20, 29, 36, 45, 49, 87],
  2: [30, 46, 53, 58, 67, 79],
  3: [13, 15, 40, 86],
  4: [11, 50, 66, 83],
  5: [18, 27, 44],
  6: [3, 8, 31, 33, 35, 52, 56, 81, 82],
  7: [42, 43, 51, 55, 71],
  8: [14, 34, 37, 47, 62],
  9: [38, 39, 76],
  10: [7, 28, 57, 63, 77, 85],
  11: [5, 26, 68, 70, 73, 80],
  12: [17, 41, 75, 88],
  13: [19, 21, 59, 60, 74, 78, 84],
  14: [4, 10, 12, 54, 72],
  15: [6, 22, 24, 48, 69],
  16: [2, 16, 25, 61],
  17: [1, 23, 32, 64, 65],
};

let regionsDataDict = {
  1: [4404288, 120, 36650.95],
  2: [1797660, 91, 19818.12],
  3: [13484462, 21765, 619.54],
  4: [5301139, 409, 12964.62],
  5: [3685744, 124, 29836.88],
  6: [12422172, 567, 21906.19],
  7: [16195042, 977, 16576.26],
  8: [3228558, 109, 29606.25],
  9: [3875576, 229, 16904.03],
  10: [6082165, 336, 18114.47],
  11: [7954723, 383, 20778.29],
  12: [8081988, 509, 15872.58],
  13: [4547150, 196, 23234.78],
  14: [5022768, 246, 20458.51],
  15: [5243536, 257, 20433.38],
  16: [4901486, 215, 22786.08],
  17: [2804788, 133, 21120.56],
};

function regionalData(selectObject) {
  let selectedObject = selectObject.value;
  if (selectedObject == "") {
    return undefined
  }
  let index = selectedRegionArr.indexOf(selectedObject);
  if (
    map.getFeatureState({ source: "regions", id: selectedObject }).select ==
    true
  ) {
    map.setFeatureState(
      { source: "regions", id: selectedObject },
      { select: false }
    );
    selectedRegionArr.splice(index, 1);
    regionCount -= 1;
    totalArea -= parseFloat(regionsDataDict[selectedObject][2]);
    popCount -= parseFloat(regionsDataDict[selectedObject][0]);
    popDensity = separator(roundToTwo(popCount / totalArea));
  } else {
    map.setFeatureState(
      { source: "regions", id: selectedObject },
      { select: true }
    );
    selectedRegionArr.push(selectedObject);
    regionCount += 1;
    totalArea += parseFloat(regionsDataDict[selectedObject][2]);
    popCount += parseFloat(regionsDataDict[selectedObject][0]);
    popDensity = separator(roundToTwo(popCount / totalArea));
  }
  if (regionCount == 0) {
    document.getElementById("popCount").innerHTML = "109,035,343";
    document.getElementById("popDensity").innerHTML = "363";
  } else {
    document.getElementById("popCount").innerHTML = separator(popCount);
    document.getElementById("popDensity").innerHTML = separator(popDensity);
  }
  document.getElementById("selectedCount").innerHTML = regionCount;
}

function clickRegion(bounds) {
  $('#regionSelection').prop('disabled', true);
  regionCount = 0;
  for (const element of selectedRegionArr) {
    map.setFeatureState({ source: "regions", id: element }, { select: false });
    let selectProvinces = regionsDict[element];
    for (const a of selectProvinces) {
      map.setFeatureState({ source: "provinces", id: a }, { select: true });
      selectedProvinceArr.push(parseInt(a));
      provinceCount += 1;
    }
  }
  document.querySelector(".mapboxgl-popup-close-button").click();
  map.setLayoutProperty("regions-fill", "visibility", "none");
  map.setLayoutProperty("provinces-fill", "visibility", "visible");
  map.setLayoutProperty("regions-line", "visibility", "none");
  map.setLayoutProperty("provinces-line", "visibility", "visible");
  map.flyTo({
    center: bounds,
    zoom: 8,
    essential: true,
  });
  document.getElementById("selectedCount").innerHTML = provinceCount;
  document.getElementById("numLoc").innerHTML = "88";
  document.getElementById("catSel").innerHTML = "Provinces";
  selectedRegionArr.length = 0;
  selProv = true;
}

function clickProvince(bounds) {
  $('#regionSelection').prop('disabled', false);
  provinceCount = 0;
  popCount = 0;
  popDensity = 0;
  totalArea = 0;
  for (const element of selectedProvinceArr) {
    map.setFeatureState(
      { source: "provinces", id: element },
      { select: false }
    );
    for (let a in regionsDict) {
      let prov = regionsDict[a];
      if (jQuery.inArray(element, prov) != -1) {
        map.setFeatureState({ source: "regions", id: a }, { select: true });
        if (jQuery.inArray(parseInt(a), selectedRegionArr) == -1) {
          selectedRegionArr.push(parseInt(a));
          regionCount += 1;
        }
        break;
      }
    }
  }
  for (const b of selectedRegionArr) {
    popCount += regionsDataDict[b][0];
    totalArea += regionsDataDict[b][2];
  }
  popDensity = separator(roundToTwo(popCount / totalArea));

  document.querySelector(".mapboxgl-popup-close-button").click();
  map.setLayoutProperty("regions-fill", "visibility", "visible");
  map.setLayoutProperty("provinces-fill", "visibility", "none");
  map.setLayoutProperty("regions-line", "visibility", "visible");
  map.setLayoutProperty("provinces-line", "visibility", "none");
  map.flyTo({
    center: bounds,
    zoom: 7,
    essential: true,
  });
  document.getElementById("popCount").innerHTML = separator(popCount);
  document.getElementById("popDensity").innerHTML = popDensity;
  document.getElementById("selectedCount").innerHTML = regionCount;
  document.getElementById("numLoc").innerHTML = "17";
  document.getElementById("catSel").innerHTML = "Regions";
  selectedProvinceArr.length = 0;
  selReg = true;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWl5dWZpIiwiYSI6ImNsMjdteGV6bzAwenczY21tbXA5aXBscmkifQ.DSm1afXHMkj3Gga6-XVuZA";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [123.1972748853604, 11.902259851314795],
  zoom: 5.5,
});

let selectedRegionId = null;
let selectedProvinceId = null;
let regionCount = 0;
let provinceCount = 0;
let popCount = 0;
let popDensity = 0;
let totalArea = 0;
let selProv = false;
let selReg = false;
const selectedRegionArr = [];
const selectedProvinceArr = [];
const testArr = [];

map.on("load", function () {
  const layers = [
    "0-11.6k",
    "11.6k-40k",
    "40k-67k",
    "67k-95k",
    "95k-120k",
    "120k-150k",
    "150k+",
  ];
  const colors = [
    "#ffdb01",
    "#ffc414",
    "#feab25",
    "#fe8f34",
    "#fd7944",
    "#fd5c53",
    "#ca4d44",
  ];

  const symbols = map.getStyle().layers;
  let firstSymbolId;
  for (const symbol of symbols) {
    if (symbol.type === "symbol") {
      firstSymbolId = symbol.id;
      break;
    }
  }

  try {
    const legend = document.getElementById("legend");

    layers.forEach((layer, i) => {
      const color = colors[i];
      const item = document.createElement("div");
      const key = document.createElement("span");
      key.className = "legend-key";
      key.style.backgroundColor = color;

      const value = document.createElement("span");
      value.innerHTML = `${layer}`;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    });
  } catch {}

  map.addSource("regions", {
    type: "geojson",
    data: "./regional.geojson",
  });

  map.addSource("provinces", {
    type: "geojson",
    data: "./provinces_id.geojson",
  });

  map.addLayer(
    {
      id: "regions-fill",
      type: "fill",
      source: "regions",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "DengueCases"],
          0,
          "#ffeb00",
          11540,
          "#ffdb01",
          40000,
          "#ffc414",
          67000,
          "#feab25",
          95000,
          "#fe8f34",
          120000,
          "#fd7944",
          150000,
          "#fd5c53",
          163000,
          "#ca4d44",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "select"], false],
          0.8,
          0.6,
        ],
      },
    },
    firstSymbolId
  );

  // console.log(map.getLayer("regions-fill"));

  map.addLayer({
    id: "regions-line",
    type: "line",
    source: "regions",
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": "#000",
      "line-opacity": [
        "case",
        ["boolean", ["feature-state", "select"], false],
        1,
        0,
      ],
    },
  });

  map.addLayer(
    {
      id: "provinces-fill",
      type: "fill",
      source: "provinces",
      layout: {
        visibility: "none",
      },
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "Population"],
          0,
          "#ffeb00",
          11540,
          "#ffdb01",
          40000,
          "#ffc414",
          67000,
          "#feab25",
          95000,
          "#fe8f34",
          120000,
          "#fd7944",
          150000,
          "#fd5c53",
          163000,
          "#ca4d44",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "select"], false],
          0.8,
          0.6,
        ],
      },
    },
    firstSymbolId
  );

  map.addLayer({
    id: "provinces-line",
    type: "line",
    source: "provinces",
    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#000",
      "line-opacity": [
        "case",
        ["boolean", ["feature-state", "select"], false],
        1,
        0,
      ],
    },
  });

  map.on("click", "regions-fill", function (e) {
    selectedRegionId = e.features[0].id;
    let index = selectedRegionArr.indexOf(selectedRegionId);

    bounds = e.lngLat;
    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h5>" +
          e.features[0].properties.ADM1ALT1EN +
          "</h5><h6>Population: " +
          separator(e.features[0].properties.Population) +
          "</h6><h6>Dengue Cases: " +
          separator(e.features[0].properties.DengueCases) +
          `</h6><button class = "w3-btn w3-border w3-round" onclick = "clickRegion(bounds)"><em class = "fa fa-search fa-fw"></em></button>`
      )
      .addTo(map);

    if (
      map.getFeatureState({ source: "regions", id: selectedRegionId }).select ==
      true
    ) {
      if (selReg != true) {
        map.setFeatureState(
          { source: "regions", id: selectedRegionId },
          { select: false }
        );
        selectedRegionArr.splice(index, 1);
        regionCount -= 1;
        totalArea -= parseFloat(e.features[0].properties.Area);
        popCount -= parseFloat(e.features[0].properties.Population);
        popDensity = separator(roundToTwo(popCount / totalArea));
      } else {
        selReg = false;
      }
    } else {
      map.setFeatureState(
        { source: "regions", id: selectedRegionId },
        { select: true }
      );
      selectedRegionArr.push(selectedRegionId);
      regionCount += 1;
      totalArea += parseFloat(e.features[0].properties.Area);
      popCount += parseFloat(e.features[0].properties.Population);
      popDensity = separator(roundToTwo(popCount / totalArea));
    }
    if (regionCount == 0) {
      document.getElementById("popCount").innerHTML = "109,035,343";
      document.getElementById("popDensity").innerHTML = "363";
    } else {
      document.getElementById("popCount").innerHTML = separator(popCount);
      document.getElementById("popDensity").innerHTML = separator(popDensity);
    }
    document.getElementById("selectedCount").innerHTML = regionCount;
  });

  map.on("mousemove", "regions-fill", (e) => {
    document.getElementById("pd").innerHTML = `<h6>${
      e.features[0].properties.ADM1ALT1EN
    }</h6><p><strong><em>${separator(
      e.features[0].properties.DengueCases
    )}</strong> Dengue cases recorded</em></p>`;
  });

  map.on("mouseenter", "regions-fill", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "regions-fill", function () {
    map.getCanvas().style.cursor = "";
    document.getElementById("pd").innerHTML =
      "<p>Hover over a region to see the number of Dengue Cases!</p>";
  });

  map.on("click", "provinces-fill", function (e) {
    selectedProvinceId = e.features[0].id;
    let index = selectedProvinceArr.indexOf(selectedProvinceId);

    bounds = e.lngLat;
    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h5>" +
          e.features[0].properties.province +
          "</h5><h6>Population: " +
          separator(e.features[0].properties.Population) +
          `</h6><button class = "w3-btn w3-border w3-round" onclick = "clickProvince(bounds)"><em class = "fa fa-search fa-fw"></em></button>`
      )
      .addTo(map);

    if (
      map.getFeatureState({ source: "provinces", id: selectedProvinceId })
        .select == true
    ) {
      if (selProv != true) {
        map.setFeatureState(
          { source: "provinces", id: selectedProvinceId },
          { select: false }
        );
        selectedProvinceArr.splice(index, 1);
        provinceCount -= 1;
        popCount -= parseFloat(e.features[0].properties.Population);
      } else {
        selProv = false;
      }
    } else {
      map.setFeatureState(
        { source: "provinces", id: selectedProvinceId },
        { select: true }
      );
      selectedProvinceArr.push(selectedProvinceId);
      provinceCount += 1;
      popCount += parseFloat(e.features[0].properties.Population);
    }
    if (provinceCount == 0) {
      document.getElementById("popCount").innerHTML = "109,035,343";
      document.getElementById("popDensity").innerHTML = "363";
    } else {
      document.getElementById("popCount").innerHTML = separator(popCount);
    }
    document.getElementById("selectedCount").innerHTML = provinceCount;
  });

  map.on("mousemove", "provinces-fill", (e) => {
    document.getElementById("pd").innerHTML = `<h6>${
      e.features[0].properties.province
    }</h6><p><strong><em>Population: ${separator(
      e.features[0].properties.Population
    )}</strong></em></p>`;
  });

  map.on("mouseenter", "provinces-fill", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "provinces-fill", function () {
    map.getCanvas().style.cursor = "";
    document.getElementById("pd").innerHTML =
      "<p>Hover over a province to see the number of Population!</p>";
  });
});
