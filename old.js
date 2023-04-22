const searchedIP = document.getElementById('search');
const searchBtn = document.getElementById('btn');
const ipEl = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');
window.onload = function () {
  searchedIP.value = '';
  document.getElementById('btn').click();
};
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(
    `https://corsproxy.io/?https://geo.ipify.org/api/v2/country?apiKey=at_ncFTP3zgHWwgWeqMfDId5iUmzUz3t&ipAddress=${searchedIP.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      let ip = data.ip;
      let location = data.location.region;
      let timezone = data.location.timezone;
      let isp = data.isp;
      ipEl.textContent = `${ip}`;
      locationEl.textContent = `${location}`;
      timezoneEl.textContent = `UTC ${timezone}`;
      ispEl.textContent = `${isp}`;
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  updateMap();
});
// const apiKey = '2da3ec202a01ad5bb16c3b2410a2755c43247df7d55819215f737bfd';
// const ipAddress = function () {
//   return data.ip;
// };

const url =
  'https://corsproxy.io/?' +
  encodeURIComponent(
    `https://api.ipdata.co/?api-key=2da3ec202a01ad5bb16c3b2410a2755c43247df7d55819215f737bfd`
  );
function updateMap() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const map = L.map('map').setView([data.latitude, data.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      L.marker([data.latitude, data.longitude])
        .addTo(map)
        // .bindPopup(
        //   `<b>${data.ip}</b><br>${data.location.region}<br>ISP: ${data.isp}`
        // )
        .openPopup();
    })
    .catch((error) => console.error('Error:', error));
}
