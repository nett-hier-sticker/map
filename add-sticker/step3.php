<?php

if (!(isset($_GET["sticker_type"]) && isset($_GET["lat"]) && isset($_GET["lng"]))) exit("Something has gone wrong. Please try again later. <a href='/'>Go back</a>.");

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Add sticker | Nett-Hier-Sticker</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/images/logo/safari-pinned-tab.svg" color="#ffff00" />
  <link rel="shortcut icon" href="/images/logo/favicon.ico" />
  <meta name="msapplication-TileColor" content="#ffc40d" />
  <meta name="msapplication-TileImage" content="/images/logo/mstile-144x144.png" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
  <meta name="theme-color" content="#ffffff" />
</head>

<body>
  <header>
    <h1>Add a sticker</h1>
    <h2>Please input some data.</h2>
  </header>
  <main>
    <form action="submit.php" method="post">
      <div>
        <label for="email">If you want updates on your submission, please enter your e-Mail:</label>
        <input type="email" name="email" id="email">
      </div>
      <hr>
      <div>
        <label for="name">The name that will be shown for your submission:</label>
        <input type="text" name="name" id="name" required>
      </div>
      <hr>
      <div>
        <label for="photo">If you have taken a photo of the sticker, please upload it here:</label>
        <input type="file" name="photo" id="photo" accept="image/*">
      </div>
      <hr>
      <div>
        <label for="description">If you want to add a description or more information, please enter it here:</label>
        <textarea name="description" id="description" rows="5"></textarea>
      </div>
      <input type="text" name="sticker_type" id="sticker_type" value="<?= htmlspecialchars($_GET["sticker_type"]) ?>" hidden>
      <input type="text" name="latitude" id="latitude" value="<?= htmlspecialchars($_GET["lat"]) ?>" hidden>
      <input type="text" name="longitude" id="longitude" value="<?= htmlspecialchars($_GET["lng"]) ?>" hidden>
      <input type="submit" id="submit" hidden>
    </form>
  </main>
  <div class="next_step_button" onclick="document.getElementById('submit').click();">
    <h1>Submit 📤</h1>
  </div>
  <script src="script.js"></script>
  <script src="/analytics.js"></script>
</body>

</html>