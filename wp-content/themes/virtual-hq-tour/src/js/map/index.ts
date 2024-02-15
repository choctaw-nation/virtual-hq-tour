import 'leaflet/dist/leaflet.css';
import '../../styles/components/leaflet.scss';
import { map, tileLayer, polygon } from 'leaflet';
// import 'esri-leaflet';
// import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { enableGeolocation } from './geolocation';
import { API_KEY } from './utilities';

class Map {
	#map: L.Map;
	#MIN_ZOOM = 18;
	#CHOCTAW_HQ: L.LatLngTuple = [ 33.974, -96.39882 ];
	#mapBounds = {
		northEastBounds: [ 33.9748, -96.3970819115639 ],
		southWestBounds: [ 33.9735, -96.40055805444719 ],
	};
	constructor( isMobile = true ) {
		if ( ! isMobile ) {
			this.#MIN_ZOOM = 19;
		}
		this.initMap();
		this.initFirstFloorZones();
	}

	private initMap() {
		const mapOptions = {
			minZoom: this.#MIN_ZOOM,
			maxBounds: Object.values( this.#mapBounds ),
		} as L.MapOptions;
		this.#map = map( 'map', mapOptions );
		tileLayer( 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 21,
			minZoom: this.#MIN_ZOOM,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		} ).addTo( this.#map );
		this.#map.setView( this.#CHOCTAW_HQ, this.#MIN_ZOOM );
		// navigator.geolocation.getCurrentPosition( ( position ) => {
		// vectorBasemapLayer( 'osm/standard', {
		// 	apiKey: API_KEY,
		// } ).addTo( leafletMap );
		// } );
	}

	private showMapButton() {
		const mapContainer = document.getElementById( 'map' );
		if ( ! mapContainer ) return;
		mapContainer.innerHTML = '';
		const button = document.createElement( 'a' );
		button.innerHTML = 'Show Map';
		button.classList.add( 'btn', 'btn-primary' );
		button.setAttribute( 'href', '/map' );
		mapContainer.appendChild( button );
	}

	private initFirstFloorZones() {
		const firstFloorWest = polygon(
			[
				[ 33.974515, -96.399581 ], // NW
				[ 33.97401, -96.398705 ], // NE
				[ 33.97357, -96.39885 ], // SE
				[ 33.97418, -96.39988 ], // SW
			],
			{ color: 'red' }
		).addTo( this.#map );
		firstFloorWest.bindPopup( 'First Floor West' ).openPopup();
	}
}

new Map(
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
);
