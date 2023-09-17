let mapProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let mapProviderAttribution = '<a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors';

let acceptTracking = null;

function chooseTracking(allow) {
    // Add OSM layer to map
    L.tileLayer(mapProvider, {
        maxZoom: 19,
        attribution: '&copy; ' + mapProviderAttribution,
    }).addTo(map);
    // Hide cookie notice
    document.getElementById("cookie_notice").style.display = "none";
    // Set allowTracking cookie (expires in 30 days)
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = "allowTracking=" + allow + ";expires=" + d.toUTCString() + ";path=/";

    // Set acceptTracking variable
    acceptTracking = allow;

    // No Tracking change
    if (allow == "n") for (matomo_scripts of document.getElementsByClassName("matomo")) matomo_scripts.remove();
    if (allow == "n") for (matomo_scripts of document.getElementsByTagName("script")) if (matomo_scripts.src.indexOf("analytics") != -1) matomo_scripts.remove();

    // 
    // Tracking
    // 
    if (allow != "y") return;
    var matomo = document.createElement("script");
    matomo.type = "text/javascript";
    matomo.classList.add("matomo");
    matomo.innerHTML = "var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u=\"//analytics.kondev.de/\";_paq.push(['setTrackerUrl', u+'matomo.php']);_paq.push(['setSiteId', '1']);var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();";
    document.head.appendChild(matomo);
}

function showMapProviderSelection() {
    document.getElementById("map_provider_selection").style.display = "grid";
}

function hideMapProviderSelection() {
    document.getElementById("map_provider_selection").style.display = "none";
}

function setMapProvider(newMapProvider) {
    switch (newMapProvider) {
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
    for (provider of document.getElementsByClassName("map_provider_selector")) {
        provider.classList.remove("active");
    }
    document.getElementById("map_provider_selector_" + newMapProvider).classList.add("active");
    if (acceptTracking != null) L.tileLayer(mapProvider, {
        maxZoom: 19,
        attribution: '&copy; ' + mapProviderAttribution,
    }).addTo(map);
    // Set mapProvider cookie (expires in 30 days)
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = "mapProvider=" + newMapProvider + ";expires=" + d.toUTCString() + ";path=/";
}

let mapProviderCookie = null;

// Load mapProvider cookie
if (document.cookie.indexOf("mapProvider") != -1) {
    mapProviderCookie = document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("mapProvider=");
    }.bind(this))[0].split("=")[1];
    for (provider of document.getElementsByClassName("map_provider_selector")) {
        provider.classList.remove("active");
    }
    document.getElementById("map_provider_selector_" + mapProviderCookie).classList.add("active");
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
}


// Check if allowTracking cookie is set
if (document.cookie.indexOf("allowTracking") != -1) {
    // Choose tracking on basis of cookie value (there are multiple, so the cookie needs to be filtered)
    chooseTracking(document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("allowTracking=");
    }.bind(this))[0].split("=")[1]);

    acceptTracking = document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("allowTracking=");
    }.bind(this))[0].split("=")[1];
}