
// Create map Centered on Stuttgart
var map = L.map("map").setView([48.778026, 9.179764], 8);

// Add OSM layer to map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var netthier_laend = L.icon({
    iconUrl: '/images/markers/netthier_laend.png',
    iconSize: [66, 38],
    iconAnchor: [33, 19],
    popupAnchor: [-3, -76]
});

var laendshape = L.icon({
    iconUrl: '/images/markers/laendshape.png',
    iconSize: [44, 48],
    iconAnchor: [22, 24],
    popupAnchor: [-3, -76]
});

var thelaend_round = L.icon({
    iconUrl: '/images/markers/thelaend_round.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [-3, -76]
});