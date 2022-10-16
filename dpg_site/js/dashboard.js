// For mobile sidebar
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

// For switching layouts in sidebar
function switchTab(tabName) {
  let i;
  let x = document.getElementsByClassName("content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

// Separator function for numbers greater than 999
function separator(number) {
  let str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

// Rounding function
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

// Provinces located in the Regions
const regionsDict = {
  1: [9, 20, 29, 36, 45, 49, 87], // BARMM
  2: [30, 46, 53, 58, 67, 79], // CAR
  3: [13, 15, 40, 86], // NCR
  4: [11, 50, 66, 83], // REGION I
  5: [18, 27, 44], // REGION II
  6: [3, 8, 31, 33, 35, 52, 56, 81, 82], // REGION III
  7: [42, 43, 51, 55, 71], // REGION 4A
  8: [14, 34, 37, 47, 62], // REGION 4B
  9: [38, 39, 76], // REGION IX
  10: [7, 28, 57, 63, 77, 85], // REGION V
  11: [5, 26, 68, 70, 73, 80], // REGION VI
  12: [17, 41, 75, 88], // REGION VII
  13: [19, 21, 59, 60, 74, 78, 84], // REGION VIII
  14: [4, 10, 12, 54, 72], // REGION X
  15: [6, 22, 24, 48, 69], // REGION XI
  16: [2, 16, 25, 61], // REGION XII
  17: [1, 23, 32, 64, 65], // REGION XIII
};

// Data of the Regions
/*
const regionsDataDict = {
  1: [4404288, 120, 36650.95], //Population, Population Density, Area
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
*/
function extractData(file) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			dataArray = JSON.parse(this.responseText);
			regionsDataDict = {}; 
			for (n = 0; n <= dataArray.length; n++) {
				regionsDataDict[n+1] = dataArray[n];
			}
			delete regionsDataDict[18];
			//regionsDataDict.pop();
		}
	};
	xhttp.open("GET", "extraction/read_csv.php?data=" + file, true);
	xhttp.send();	
}

extractData(1);


const regionsDengueCases = {
  1: [20001, 30001, 40001, 50001, 60001, 70001], // 2016, 2017, 2018, 2019, 2020, 2021
  2: [20002, 30002, 40002, 50002, 60002, 70002],
  3: [20003, 30003, 40003, 50003, 60003, 70003],
  4: [20004, 30004, 40004, 50004, 60004, 70004],
  5: [20005, 30005, 40005, 50005, 60005, 70005],
  6: [20006, 30006, 40006, 50006, 60006, 70006],
  7: [20007, 30007, 40007, 50007, 60007, 70007],
  8: [20008, 30008, 40008, 50008, 60008, 70008],
  9: [20009, 30009, 40009, 50009, 60009, 70009],
  10: [20010, 30010, 40010, 50010, 60010, 70010],
  11: [20011, 30011, 40011, 50011, 60011, 70011],
  12: [20012, 30012, 40012, 50012, 60012, 70012],
  13: [20013, 30013, 40013, 50013, 60013, 70013],
  14: [20014, 30014, 40014, 50014, 60014, 70014],
  15: [20015, 30015, 40015, 50015, 60015, 70015],
  16: [20016, 30016, 40016, 50016, 60016, 70016],
  17: [20017, 30017, 40017, 50017, 60017, 70017],
};

// Function for selecting regional data from the dropdown
function regionalData(selectObject) {
  let selectedObject = selectObject.value;
  if (selectedObject == "") {
    return undefined;
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

// Function for getting province data from the regions selected
function clickRegion(bounds) {
  $("#regionSelection").prop("disabled", true);
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

// Function for getting region data from the provinces selected
function clickProvince(bounds) {
  $("#regionSelection").prop("disabled", false);
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

// Map functions
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

  // Region fill layer
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

  // Region line layer
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

  // Provinces fill layer
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

  // Provinces line layer
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

  // Click function when regions-fill layer is clicked
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
          "</h6><h6>Total Dengue Cases: " +
          separator(e.features[0].properties.DengueCases) +
          `</h6><button class = "w3-btn w3-border w3-round" onclick = "clickRegion(bounds)"><em class = "fa fa-search fa-fw"></em></button>
          <br>
          <canvas id="dengueLineChart" width="400" height="350"></canvas>
          <style>
            .mapboxgl-popup-content {
              width: 300px;
              height: 400px;
          }
          </style>`
      )
      .addTo(map);

    let ctx = document.getElementById("dengueLineChart").getContext("2d");
    const dengueLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021"],
        datasets: [
          {
            label: "Dengue Cases Recorded",
            data: regionsDengueCases[selectedRegionId],
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

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

  // Hover function in regions-fill layer
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

  // Click function when provinces-fill layer is clicked
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

  // Hover function in provinces-fill layer
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
