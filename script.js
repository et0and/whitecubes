const map = L.map('map').setView([-36.8485, 174.7633], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoidG9tdXBvbSIsImEiOiJjbGdiaG94cmYwM25oM2VsaTZhZW9haGg1In0.9KpWucMh_XztKD--rD7Tbw'
}).addTo(map);

fetch('galleries.json')
  .then((response) => response.json())
  .then((galleries) => {
    galleries.forEach((gallery) => {
      const marker = L.marker([gallery.lat, gallery.lng]).addTo(map);
      marker.bindPopup(`<b>${gallery.name}</b><br>${gallery.description}`);
    });
  });
