var mySidebar = document.getElementById("mySidebar");
var overlayBg = document.getElementById("myOverlay");

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
  var i;
  var x = document.getElementsByClassName("content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

function separator(number) {
  var str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function clickRegion(bounds) {
  regionCount = 0;
  for (const element of selectedRegionArr) {
    map.setFeatureState({ source: "regions", id: element }, { select: false });
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

  selectedRegionArr.length = 0;
  regionCode.length = 0;
  popCount = 0;
  popDensity = 0;
}

function clickProvince(bounds) {
  provinceCount = 0;
  for (const element of selectedProvinceArr) {
    map.setFeatureState(
      { source: "provinces", id: element },
      { select: false }
    );
  }

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
  selectedProvinceArr.length = 0;
  popCount = 0;
  popDensity = 0;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWl5dWZpIiwiYSI6ImNsMjdteGV6bzAwenczY21tbXA5aXBscmkifQ.DSm1afXHMkj3Gga6-XVuZA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [123.1972748853604, 11.902259851314795],
  zoom: 5.5,
});

let selectedRegionId = null;
let selectedProvinceId = null;
var regionCount = 0;
var provinceCount = 0;
var popCount = 0;
var popDensity = 0;
const selectedRegionArr = [];
const selectedProvinceArr = [];
const regionCode = []

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

  console.log(map.getLayer("regions-fill"));

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
    var index = selectedRegionArr.indexOf(selectedRegionId);
    var codeIndex = regionCode.indexOf(e.features[0].properties.ADM1_PCODE)
    if (index == -1) {
      selectedRegionArr.push(selectedRegionId);
      regionCode.push(e.features[0].properties.ADM1_PCODE)
      // console.log(map.queryRenderedFeatures(e.point)[0].id)
    } else {
      selectedRegionArr.splice(index, 1);
      regionCode.splice(codeIndex, 1);
    }
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
      map.setFeatureState(
        { source: "regions", id: selectedRegionId },
        { select: false }
      );
      regionCount -= 1;
      popCount -= parseFloat(e.features[0].properties.Population);
      popDensity -= parseFloat(e.features[0].properties.PopulationDensity);
    } else {
      map.setFeatureState(
        { source: "regions", id: selectedRegionId },
        { select: true }
      );
      regionCount += 1;
      popCount += parseFloat(e.features[0].properties.Population);
      popDensity += parseFloat(e.features[0].properties.PopulationDensity);
    }
    if (regionCount == 0) {
      document.getElementById("popCount").innerHTML = "109,035,343";
      document.getElementById("popDensity").innerHTML = "363";
    } else {
      document.getElementById("popCount").innerHTML = separator(popCount);
      document.getElementById("popDensity").innerHTML = separator(popDensity);
    }
    document.getElementById("regionCount").innerHTML = regionCount;
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
    var index = selectedProvinceArr.indexOf(selectedProvinceId);
    if (index == -1) {
      selectedProvinceArr.push(selectedProvinceId);
    } else {
      selectedProvinceArr.splice(index, 1);
    }
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
      map.setFeatureState(
        { source: "provinces", id: selectedProvinceId },
        { select: false }
      );
      provinceCount -= 1;
      popCount -= parseFloat(e.features[0].properties.Population);
    } else {
      map.setFeatureState(
        { source: "provinces", id: selectedProvinceId },
        { select: true }
      );
      provinceCount += 1;
      popCount += parseFloat(e.features[0].properties.Population);
    }
    if (provinceCount == 0) {
      document.getElementById("popCount").innerHTML = "109,035,343";
      document.getElementById("popDensity").innerHTML = "363";
    } else {
      document.getElementById("popCount").innerHTML = separator(popCount);
    }
    document.getElementById("regionCount").innerHTML = provinceCount;
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
