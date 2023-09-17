<?php

// Get config
require($_SERVER["DOCUMENT_ROOT"] . "/config.php");

// DB Connection
$con = mysqli_connect(
  $settings["db"]["host"],
  $settings["db"]["user"],
  $settings["db"]["password"],
  $settings["db"]["name"]
);
if (mysqli_connect_errno()) exit("Error with the Database");

// Get all markers
if ($stmt = $con->prepare("SELECT * FROM " . $settings["db"]["tables"]["markers"])) {
  $stmt->execute();
  $result = $stmt->get_result();
  $markers = $result->fetch_all(MYSQLI_ASSOC);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Map | Nett-Hier-Sticker</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="smallscreen.css">
  <link rel="stylesheet" href="leaflet.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/images/logo/safari-pinned-tab.svg" color="#ffff00">
  <link rel="shortcut icon" href="/images/logo/favicon.ico">
  <meta name="msapplication-TileColor" content="#ffc40d">
  <meta name="msapplication-TileImage" content="/images/logo/mstile-144x144.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

</head>

<body>
  <main id="main">
    <div class="cookie_notice" id="cookie_notice">
      <div>
        <h1>Hey, we are using 🍪!</h1>
        <p>
          By using this map you agree to our <a href="/legal/privacy_policy/" target="_blank">privacy policy</a>.
        </p>
        <p>
          When clicking on "Accept tracking" or "No tracking" you use OpenStreetMap as map provider, so a connection to their servers is established. <br>
          If you want to choose another map provider, click <span onclick="showMapProviderSelection()" style="cursor: pointer;text-decoration: underline;">here</span>.
        </p>
        <p>
          When clicking on "Accept tracking" you also help us to improve our service by sending anonymous usage data to our servers. <br>
          More information about this can be found in our <a href="/legal/privacy_policy/" target="_blank">privacy policy</a>.
        </p>
        <p>
          When clicking any of the buttons below, we will create a cookie to remember your choice.
        </p>
        <button id="accept_all" onclick="chooseTracking('y');">Accept tracking and External Content</button>
        <button id="no_tracking" onclick="chooseTracking('n');">No tracking, allow External Content</button>
      </div>
    </div>
    <div id="map"></div>
    <div id="action_pane">
      <div class="marker_info">
        <h1 id="marker_info_id">Please choose a sticker</h1>
      </div>
      <div class="add_button" onclick="location.assign('/add-sticker')">
        + Add Sticker Location
      </div>
      <div class="not_official_note">
        This is not an official map but a community project. <br> You can get the official stickers <a href="https://shop.thelaend.de/faenartikel/" target="_blank">here</a> for free if you live in Germany.
      </div>
      <div class="action_pane_smallscreen_close" onclick="closeActionPane()">&xotime;</div>
    </div>
  </main>
  <div id="action_buttons">
    <div class="cookie_opener" onclick='document.getElementById("cookie_notice").style.display = "grid";'>🍪</div>
    <div class="map_provider_opener" onclick="showMapProviderSelection()">🌍</div>
    <div class="smallscreen_add_button" onclick="location.assign('/add-sticker')">📌</div>
  </div>
  <div class="overlay" id="map_provider_selection">
    <div>
      <div class="map_provider_selector" id="map_provider_selector_cartodb" onclick="setMapProvider('cartodb')">
        <div class="map_provider_selector-image">
          <img src="/images/mapProviders/cartodb_voyager.png" alt="CartoDB Voyager">
        </div>
        <p>
          CartoDB Voyager
        </p>
      </div>
      <div class="map_provider_selector" id="map_provider_selector_esri" onclick="setMapProvider('esri')">
        <div class="map_provider_selector-image">
          <img src="/images/mapProviders/esri_natgeo.png" alt="Esri NatGeo">
        </div>
        <p>
          Esri NatGeo
        </p>
      </div>
      <div class="map_provider_selector active" id="map_provider_selector_osm" onclick="setMapProvider('osm')">
        <div class="map_provider_selector-image">
          <img src="/images/mapProviders/osm.png" alt="OpenStreetMap">
        </div>
        <p>
          OpenStreetMap
        </p>
      </div>
      <div class="map_provider_selector" id="map_provider_selector_usgs" onclick="setMapProvider('usgs')">
        <div class="map_provider_selector-image">
          <img src="/images/mapProviders/usgs_usimagery.png" alt="USGS US Imagery">
        </div>
        <p>
          USGS US Imagery
        </p>
      </div>
      <button onclick="hideMapProviderSelection()">Close</button>
    </div>
  </div>
  <script src="leaflet.js"></script>
  <script src="map.js"></script>
  <script src="cookie-banner.js"></script>
  <script src="script.js"></script>
  <script>
    <?php
    if (count($markers) != 0) foreach ($markers as $marker) echo 'L.marker([' . $marker["longitude"] . ', ' . $marker["latitude"] . '], {icon: ' . $marker["sticker_type"] . '}).addTo(map).on("click", () => markerClick("' . $marker["id"] . '"));';
    ?>
  </script>
</body>

</html>