const searchedIP = document.getElementById('search');
const searchBtn = document.getElementById('btn');
const ipEl = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');

window.onload = () => {
  searchedIP.value = '';
  searchBtn.click();
};
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  updateIp();
});

// check if the map is initialized
let container = L.DomUtil.get('map');
if (container != null) {
  container._leaflet_id = null;
}

function updateIp() {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=fb7a03c8915e4530926f317b267954d6&ip=${searchedIP.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      ipEl.textContent = `${data.ip}`;
      locationEl.textContent = `${data.city}`;
      timezoneEl.textContent = `UTC ${data.time_zone.offset}`;
      ispEl.textContent = `${data.organization}`;
      console.log(data);
      const map = L.map('map').setView([data.latitude, data.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      L.marker([data.latitude, data.longitude])
        .addTo(map)
        .bindPopup(
          `<b>${data.ip}</b><br>${data.city}<br>ISP: ${data.organization}`
        )
        .openPopup();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
