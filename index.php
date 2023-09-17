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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nett-Hier-Sticker Map</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="leaflet.css" />
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
    </div>
  </main>
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