// ?sticker_type
const sticker_type = new URLSearchParams(window.location.search).get('sticker_type');
if (sticker_type == null) location.assign("/add-sticker");

// 
// Map stuff
// 


let mapProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let mapProviderAttribution = '<a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors';

function loadMap(MapProvider) {
    switch (MapProvider) {
        case "osm":
            mapProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            mapProviderAttribution = '<a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors';
            break;
        case "esri":
            mapProvider = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
            mapProviderAttribution = '<a href="https://www.esri.com/">Esri</a>';
            break;
        case "cartodb":
            mapProvider = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
            mapProviderAttribution = '<a href="https://carto.com/attributions">Carto</a>';
            break;
        case "usgs":
            mapProvider = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}";
            mapProviderAttribution = '<a href="https://www.usgs.gov/">USGS</a>';
            break;
    }
    L.tileLayer(mapProvider, {
        maxZoom: 19,
        attribution: '&copy; ' + mapProviderAttribution,
    }).addTo(map);
}

let mapProviderCookie = null;

// Load mapProvider cookie
if (document.cookie.indexOf("mapProvider") != -1) {
    mapProviderCookie = document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("mapProvider=");
    }.bind(this))[0].split("=")[1];
    switch (mapProviderCookie) {
        case "osm":
            mapProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            mapProviderAttribution = '<a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors';
            break;
        case "esri":
            mapProvider = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
            mapProviderAttribution = '<a href="https://www.esri.com/">Esri</a>';
            break;
        case "cartodb":
            mapProvider = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
            mapProviderAttribution = '<a href="https://carto.com/attributions">CartoDB</a>';
            break;
        case "usgs":
            mapProvider = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}";
            mapProviderAttribution = '<a href="https://www.usgs.gov/">USGS</a>';
            break;
    }
    loadMap();
} else loadMap("osm");

let marker = null;

map.on('click', function (e) {
    if (marker == null) marker = L.marker(e.latlng, {
        draggable: true,
    }).addTo(map);
});