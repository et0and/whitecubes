const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const defaultZoom = isMobile ? 12 : 13;
const map = L.map('map').setView([-36.8485, 174.7633], defaultZoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch('whitecubes.geojson')
  .then((response) => response.json())
  .then((geojsonData) => {
    L.geoJSON(geojsonData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties.description}`);
      },
    }).addTo(map);
  });
