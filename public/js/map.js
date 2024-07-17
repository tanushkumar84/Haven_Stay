mapboxgl.accessToken = mapToken;

const coordinatesArray = JSON.parse(coordinates);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinatesArray, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(coordinatesArray);

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinatesArray)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<P>Exact Location provided after booking</p>`))
    .addTo(map);
