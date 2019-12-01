mapboxgl.accessToken =
  "pk.eyJ1IjoidHNxdWlyZTUiLCJhIjoiY2pvanRudmRpMDB0aTNrbnk3NXpyc205ayJ9.VebVhb0D-yXiqv8ZVMCI0Q";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-0.142150, 51.539504], // starting position [lng, lat]
  zoom: 12
});
// 
map.on("load", function() {
  fetch(
    "/kerbdata.json", // used for speed purposes https://fordkerbhack.azure-api.net/features?viewport=51.3935663,-0.2287717,51.6609623,-0.1088357"
    {
      headers: {
        "Ocp-Apim-Subscription-Key": "fb692dfd71834bc5b40d2bf3aef7be2c"
      }
    }
  )
    .then(response => response.json())
    .then(curbLR => {
    console.log(curbLR)
    var demoFeatures = curbLR.features.filter(feature => console.log(feature.properties.location.objectId))
      map.addLayer({
        id: "bays",
        type: "line",
        source: {
          type: "geojson",
          data: curbLR
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#139DCD",
          "line-width": 3
        }
      });

    // map.addLayer({
    //   id: "bays",
    //     type: "line",
    //     source: {
    //       type: "geojson",
    //       data: curbLR
    //     },
    //     layout: {
    //       "line-join": "round",
    //       "line-cap": "round"
    //     },
    //     paint: {
    //       "line-color": "red",
    //       "line-width": 5
    //     }
    // })
    });
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'bays', function (e) {
  const featureId = JSON.parse(e.features[0].properties.location).objectId;
  var coordinates = e.features[0].geometry.coordinates.slice();
  const featureLong = coordinates[0][0];
  const featureLat = coordinates[0][1];
  var description = e.features[0].properties.description;
  description = "test";
  fetch("/api/feature/"+featureId+"/space-probability")
    .then(response => response.json())
    .then((spaceData) => {
      console.log(spaceData);
      new mapboxgl.Popup()
        .setLngLat([featureLong,featureLat])
        .setHTML(description)
        .addTo(map);
    })
});
 
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'bays', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'bays', function () {
map.getCanvas().style.cursor = '';
});
