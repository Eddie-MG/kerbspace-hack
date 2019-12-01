mapboxgl.accessToken =
  "pk.eyJ1IjoidHNxdWlyZTUiLCJhIjoiY2pvanRudmRpMDB0aTNrbnk3NXpyc205ayJ9.VebVhb0D-yXiqv8ZVMCI0Q";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [-0.2287717, 51.4], // starting position [lng, lat]
  zoom: 16
});

map.on("load", function() {
  fetch(
    "https://fordkerbhack.azure-api.net/features?viewport=51.3935663,-0.2287717,51.6609623,-0.1088357",
    {
      headers: {
        "Ocp-Apim-Subscription-Key": "fb692dfd71834bc5b40d2bf3aef7be2c"
      }
    }
  )
    .then(response => response.json())
    .then(curbLR => {
    console.log(curbLR)
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
          "line-width": 2
        }
      });
    });
});
