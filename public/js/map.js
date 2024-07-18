mapboxgl.accessToken = mapToken;

const coordinatesArray = JSON.parse(coordinates); // Ensure `coordinates` is correctly fetched and parsed

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [77.1025,28.7041], // [lng, lat] format
    zoom: 9 // starting zoom level
});
console.log(coordinatesArray);

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinatesArray)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>Listing Location</h4>`)) // Modify as needed for your popup content
    .addTo(map);
