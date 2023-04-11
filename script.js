function createCustomIcon(color) {
    return L.icon({
      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }  

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const defaultZoom = isMobile ? 12 : 13;
const map = L.map('map').setView([-36.8485, 174.7633], defaultZoom);
  
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch('whitecubes.json')
  .then((response) => response.json())
  .then((galleries) => {
    galleries.forEach((gallery) => {
      const customIcon = createCustomIcon(gallery.color);
      const marker = L.marker([gallery.lat, gallery.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<b>${gallery.name}</b><br>${gallery.description}`);
    });
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
