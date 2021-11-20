import { makeAllAktive, makeAllDisabled} from './form-actions.js';
import './main.js';

const DEFAULT_MARKER = {
  lat: 35.68950,
  lng: 139.69171,
};

const map = L.map('map-canvas')
  .on ('load', makeAllAktive)
  .setView(DEFAULT_MARKER, 10)
  .on ('unload', makeAllDisabled);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker(
  DEFAULT_MARKER,
  {
    draggable:true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinatesForAddress = Object.values(coordinates).map ((coordinate) => coordinate.toFixed('5')).join(', ');
  const addressInput = document.querySelector('#address');
  addressInput.value = coordinatesForAddress;

});


const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (offersArray, arrayForPopup ) => {
  offersArray.forEach ((dataForCard, idx) => {
    const offerLat = dataForCard.location.lat;
    const offerLng = dataForCard.location.lng;

    const marker = L.marker({
      lat: offerLat,
      lng: offerLng,
    }, {
      icon,
    },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(arrayForPopup[idx]);
  });
};

const removeMarkers = () => markerGroup.clearLayers();

export {DEFAULT_MARKER, mainMarker, renderMarkers, removeMarkers};
