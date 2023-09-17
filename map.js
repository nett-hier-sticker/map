// Create map Centered on Stuttgart
var map = L.map("map").setView([48.778026, 9.179764], 8);

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

var notbad_laend = L.icon({
    iconUrl: '/images/markers/notbad_laend.png',
    iconSize: [66, 38],
    iconAnchor: [33, 19],
    popupAnchor: [-3, -76]
});