// Check if allowTracking cookie is set
if (document.cookie.indexOf("allowTracking") != -1) {
    // Choose tracking on basis of cookie value (there are multiple, so the cookie needs to be filtered)
    analytics_cookie = document.cookie.split(";").filter(function (item) {
        return item.trim().startsWith("allowTracking=");
    }.bind(this))[0].split("=")[1];

    if (analytics_cookie == "y") {
        var matomo = document.createElement("script");
        matomo.type = "text/javascript";
        matomo.classList.add("matomo");
        matomo.innerHTML = "var _paq = window._paq = window._paq || [];_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function() {var u=\"//analytics.kondev.de/\";_paq.push(['setTrackerUrl', u+'matomo.php']);_paq.push(['setSiteId', '1']);var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();";
        document.head.appendChild(matomo);
    }
}