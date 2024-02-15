import 'leaflet/dist/leaflet.css';
import { map } from 'leaflet';
import 'esri-leaflet';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import '../../styles/pages/front-page.scss';
import { enableGeolocation } from './geolocation';
import { API_KEY } from './utilities';

const CHOCTAW_HQ = {
	latlng: [ 33.974, -96.39882 ],
	zoom: 19,
};
const mapUrl = document.getElementById( 'url' )?.dataset.url;
navigator.geolocation.getCurrentPosition( ( position ) => {
	const northEastBounds = [ 33.9748, -96.3970819115639 ];
	const southWestBounds = [ 33.9735, -96.40055805444719 ];
	const mapOptions = {
		minZoom: 13,
		maxBounds: [ northEastBounds, southWestBounds ],
	};

	const leafletMap = map( 'map', mapOptions );
	leafletMap.setView( CHOCTAW_HQ.latlng, CHOCTAW_HQ.zoom );
	const basemapEnum = 'osm/standard';
	vectorBasemapLayer( basemapEnum, {
		apiKey: API_KEY,
	} ).addTo( leafletMap );
} );
