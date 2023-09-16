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
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
</head>

<body>
  <main id="main">
    <div id="map"></div>
    <div id="action_pane">
      <div class="marker_info">
        <h1 id="marker_info_id">Please choose a sticker</h1>
      </div>
      <div class="add_button">
        + Add Sticker Location
      </div>
      <div class="not_official_note">
        This is not an official map but a community project. <br> You can get the official stickers <a href="https://shop.thelaend.de/faenartikel/" target="_blank">here</a> for free if you live in Germany.
      </div>
    </div>
  </main>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script src="map.js"></script>
  <script src="script.js"></script>
  <script>
    <?php
    if (count($markers) != 0) foreach ($markers as $marker) echo 'L.marker([' . $marker["longitude"] . ', ' . $marker["latitude"] . '], {icon: ' . $marker["sticker_type"] . '}).addTo(map).on("click", () => markerClick("' . $marker["id"] . '"));';
    ?>
  </script>
</body>

</html>