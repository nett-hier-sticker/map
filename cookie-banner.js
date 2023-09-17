function chooseTracking(allow) {
    // Add OSM layer to map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // Hide cookie notice
    document.getElementById("cookie_notice").style.display = "none";
    // Set allowTracking cookie (expires in 30 days)
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = "allowTracking=" + allow + ";expires=" + d.toUTCString() + ";path=/";

    // 
    // Tracking
    // 
    if (allow != "y") return;
    var matomo = document.createElement("script");
    matomo.type = "text/javascript";
    matomo.innerHTML = "var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u=\"//analytics.kondev.de/\";_paq.push(['setTrackerUrl', u+'matomo.php']);_paq.push(['setSiteId', '1']);var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();";
    document.head.appendChild(matomo);
}

// Check if allowTracking cookie is set
if (document.cookie.indexOf("allowTracking") != -1) {
    // Choose tracking on basis of cookie value (there are multiple, so the cookie needs to be filtered)
    chooseTracking(document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("allowTracking=");
    }.bind(this))[0].split("=")[1]);
}