import 'leaflet/dist/leaflet.css';
import { map, CRS, imageOverlay } from 'leaflet/dist/leaflet.js';
import '../../styles/pages/front-page.scss';
import { enableGeolocation } from './geolocation';

const CHOCTAW_HQ = {
	latlng: [ 35.4676, -97.5164 ],
	zoom: 19,
};
const mapUrl = document.getElementById( 'url' )?.dataset.url;
const mapOptions = {
	crs: CRS.Simple,
	minZoom: 0,
	maxZoom: 2,
};
const bounds = [
	[ 0, 0 ],
	[ 1024, 1024 ],
];
const leafletMap = map( 'map', mapOptions );
const image = imageOverlay( mapUrl, bounds ).addTo( leafletMap );
leafletMap.fitBounds( bounds );

const canGeolocate = false;
if ( canGeolocate ) {
	enableGeolocation( leafletMap, CHOCTAW_HQ );
}
