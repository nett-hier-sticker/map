const main = document.getElementById('main');
const marker_info_id = document.getElementById('marker_info_id');
const action_pane = document.getElementById('action_pane');

function markerClick(id) {
    console.log(id);
    marker_info_id.innerText = "#" + id.toUpperCase();

    if (window.innerWidth < 800) {
        action_pane.style.display = "grid";
    }
}

function closeActionPane() {
    action_pane.style.display = "none";
}