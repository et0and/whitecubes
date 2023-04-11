const map = L.map('map').setView([-36.8485, 174.7633], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch('galleries.geojson')
  .then((response) => response.json())
  .then((geojsonData) => {
    L.geoJSON(geojsonData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties.description}`);
      },
    }).addTo(map);
  });
