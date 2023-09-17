let chosenSticker = null;
function chooseSticker(sticker_type) {
    if (chosenSticker == sticker_type) return;
    chosenSticker = sticker_type;
    for (sticker of document.getElementsByClassName("sticker_type")) {
        sticker.style.backgroundColor = "var(--theme-color)";
        sticker.style.color = "var(--text-color)";
    }
    document.getElementsByClassName(sticker_type)[0].style.backgroundColor = "#000";
    document.getElementsByClassName(sticker_type)[0].style.color = "#fff";
}



// Next step button
function nextStep(i) {
    switch (i) {
        case 1:
            if (chosenSticker == null) alert("Please choose a sticker type");
            else location.assign("step2.html?sticker_type=" + chosenSticker);
            break;
        case 2:
            if (!marker || marker == null) alert("Please choose a location");
            else location.assign("step3.html?sticker_type=" + sticker_type + "&lat=" + marker.getLatLng().lat + "&lng=" + marker.getLatLng().lng);
    }
}