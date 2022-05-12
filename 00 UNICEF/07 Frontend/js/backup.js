// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

var test = document.getElementById("test");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = "block";
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
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

mapboxgl.accessToken =
  "pk.eyJ1IjoibWl5dWZpIiwiYSI6ImNsMjdteGV6bzAwenczY21tbXA5aXBscmkifQ.DSm1afXHMkj3Gga6-XVuZA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/miyufi/cl2vxajkh000n14qhtwiv2vgu",
  center: [123.1972748853604, 11.902259851314795],
  minZoom: 6
});

let selectedRegionId = null;
var regionCount = 0;
var popCount = 0;
var popDensity = 0;

map.on("load", function () {
  const layers = [
    '0-11.6k',
    '11.6k-40k',
    '40k-67k',
    '67k-95k',
    '95k-120k',
    '120k-150k',
    '150k+'
  ];
  const colors = [
    '#ffdb01',
    '#ffc414',
    '#feab25',
    '#fe8f34',
    '#fd7944',
    '#fd5c53',
    '#ca4d44',
  ];

  const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});
  // Add a source for the state polygons.
  // map.addSource("regions", {
  //   type: "geojson",
  //   data: "./regional.geojson",
  // });

  // // Add a layer showing the state polygons.
  // map.addLayer({
  //   id: "regions-fill",
  //   type: "fill",
  //   source: "regions",
  //   paint: {
  //     "fill-color": "#559999",
  //     "fill-opacity": [
  //       "case",
  //       ["boolean", ["feature-state", "select"], false],
  //       0.8,
  //       0.3,
  //     ],
  //   },
  // });

  // map.addLayer({
  //   id: "regions-layer",
  //   type: "line",
  //   source: "regions",
  //   layout: {},
  //   paint: {
  //     "line-color": "#666",
  //     "line-width": 1,
  //   },
  // });

  // // When a click event occurs on a feature in the states layer, open a popup at the
  // // location of the click, with description HTML from its properties.
  // map.on("click", "regions-fill", function (e) {
  //   const popup = new mapboxgl.Popup()
  //     .setLngLat(e.lngLat)
  //     .setHTML(
  //       "<h5>" +
  //         e.features[0].properties.ADM1ALT1EN +
  //         "</h5> \
  //       <h6>Population: " +
  //         e.features[0].properties.Population +
  //         "</h6>"
  //     )
  //     .addTo(map);

  //   selectedRegionId = e.features[0].id;
  //   if (
  //     map.getFeatureState({ source: "regions", id: selectedRegionId }).select ==
  //     true
  //   ) {
  //     map.setFeatureState(
  //       { source: "regions", id: selectedRegionId },
  //       { select: false }
  //     );
  //     regionCount -= 1;
  //     popCount -= parseFloat(
  //       e.features[0].properties.Population
  //     );
  //     popDensity -= parseFloat(
  //       e.features[0].properties.PopulationDensity
  //     );
  //     popup.remove();
  //   } else {
  //     map.setFeatureState(
  //       { source: "regions", id: selectedRegionId },
  //       { select: true }
  //     );
  //     regionCount += 1;
  //     popCount += parseFloat(
  //       e.features[0].properties.Population
  //     );
  //     popDensity += parseFloat(
  //       e.features[0].properties.PopulationDensity
  //     );
  //   }
  //   if (regionCount == 0) {
  //     document.getElementById("popCount").innerHTML = "109,035,343";
  //     document.getElementById("popDensity").innerHTML = "363";
  //   } else {
  //     document.getElementById("popCount").innerHTML = separator(popCount);
  //     document.getElementById("popDensity").innerHTML = separator(popDensity);
  //   }
  //   document.getElementById("regionCount").innerHTML = regionCount;

  //   // console.log(e.features[0].geometry)
  //   // map.addSource(e.features[0].properties.ADM1ALT1EN, {
  //   //     'type': 'geojson',
  //   //     'data': {
  //   // 		'type': 'Feature',
  //   // 		'geometry': e.features[0].geometry
  //   // 	}
  //   // });

  //   // map.addLayer({
  //   // 'id': e.features[0].properties.ADM1ALT1EN,
  //   // 'type': 'fill',
  //   // 'source': e.features[0].properties.ADM1ALT1EN,
  //   // 'layout': {},
  //   // 'paint': {
  //   //         'fill-color': '#088',
  //   //         'fill-opacity': 0.8
  //   //     }
  //   // });
  // });

  map.on("mousemove", (e) => {
    const regions = map.queryRenderedFeatures(e.point, {
      layers: ['regionFill']
    });
    document.getElementById('pd').innerHTML = regions.length
      ? `<h6>${regions[0].properties.ADM1ALT1EN}</h6><p><strong><em>${separator(regions[0].properties.DengueCases)}</strong> Dengue cases recorded</em></p>`
      : `<p>Hover over a region to see the number of Dengue Cases!</p>`;
  });
    // if (e.features.length > 0) {
    //   if (selectedRegionId !== null) {
    //     map.setFeatureState(
    //       { source: "regions", id: selectedRegionId },
    //       { hover: false }
    //     );
    //   }
    //   selectedRegionId = e.features[0].id;
    //   map.setFeatureState(
    //     { source: "regions", id: selectedRegionId },
    //     { hover: true }
    //   );
    // }
  // });

  // // When a click event occurs on a feature in the states layer, open a popup at the
  // // location of the click, with description HTML from its properties.
  // // map.on('click', 'regions-fill', function (e) {
  // // new mapboxgl.Popup()
  // // .setLngLat(e.lngLat)
  // // .setHTML(e.features[0].properties.ADM1ALT1EN)
  // // .addTo(map);
  // // });

  // // Change the cursor to a pointer when the mouse is over the states layer.
  // map.on("mouseenter", "regions-fill", function () {
  //   map.getCanvas().style.cursor = "pointer";
  // });

  // // Change it back to a pointer when it leaves.
  // map.on("mouseleave", "regions-fill", function () {
  //   map.getCanvas().style.cursor = "";
  // });
});
