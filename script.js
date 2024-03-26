const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const defaultZoom = isMobile ? 12 : 13;
const map = L.map('map', {
    tap: true,
    tapTolerance: 10
    }
).setView([-36.8485, 174.7633], defaultZoom);
  
const thunderforestTileUrl = `https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=${process.env.THUNDERFOREST_API_KEY}`;

L.tileLayer(thunderforestTileUrl, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('whitecubes.geojson')
  .then((response) => response.json())
  .then((geojsonData) => {
    L.geoJSON(geojsonData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties.description}<br><br><i>${feature.properties.address}</i>`);
      },
    }).addTo(map);
  });

  class TitleControl extends L.Control {
    onAdd(map) {
      const title = L.DomUtil.create('div');
  
      title.innerHTML = 'Whitecubes'; // Set the title text
      title.style.fontSize = '18px'; // Adjust font size as needed
      title.style.fontWeight = 'bold'; // Set font weight
      title.style.color = '#000'; // Set text color
      title.style.margin = '10px'; // Add some margin for a better look
  
      return title;
    }
  }

  const titleControl = new TitleControl({ position: 'bottomleft' });
titleControl.addTo(map);
