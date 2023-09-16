const main = document.getElementById('main');
const marker_info_id = document.getElementById('marker_info_id');

function markerClick(id) {
    console.log(id);
    marker_info_id.innerText = "#" + id.toUpperCase();
}