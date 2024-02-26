import 'leaflet/dist/leaflet.css';
import '../../styles/components/leaflet.scss';
import { map, tileLayer, polygon, popup, circle, marker, icon } from 'leaflet';
// import 'esri-leaflet';
// import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { enableGeolocation } from './geolocation';
import { API_KEY } from './utilities';
import { VideoPopups } from './VideoPopups';

class Map {
	private map: L.Map;
	private MIN_ZOOM = 18;
	private CHOCTAW_HQ: L.LatLngTuple = [ 33.974, -96.39882 ];
	private mapBounds = {
		northEastBounds: [ 33.9748, -96.3970819115639 ],
		southWestBounds: [ 33.9725, -96.40055805444719 ],
	};
	private videos: VideoPopups;
	private videoPopUpOptions = {
		minWidth: 640,
		keepInView: true,
	};

	constructor( isMobile = true ) {
		this.videos = new VideoPopups();
		if ( ! isMobile ) {
			this.MIN_ZOOM = 19;
		}
		this.initMap();
		this.initFirstFloorZones();
	}

	private initMap() {
		const mapOptions = {
			minZoom: this.MIN_ZOOM,
			maxBounds: Object.values( this.mapBounds ),
		} as L.MapOptions;

		this.map = map( 'map', mapOptions );

		tileLayer( 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 21,
			minZoom: this.MIN_ZOOM,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		} ).addTo( this.map );

		this.map.setView( this.CHOCTAW_HQ, this.MIN_ZOOM );

		this.addMarkers();

		// this.map.locate( {
		// 	maxZoom: 19,
		// 	enableHighAccuracy: true,
		// } );
		// this.map.on( 'locationfound', this.calcDistance.bind( this ) );

		// this.map.on( 'locationerror', ( e ) => {
		// 	alert( e.message );
		// } );
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
		).addTo( this.map );
		firstFloorWest.bindPopup( 'First Floor West' );

		const mainLobby = circle( [ 33.97365, -96.39875 ], {
			color: 'green',
			radius: 12,
		} ).addTo( this.map );
		mainLobby.bindPopup(
			this.videos.getPopup( 4 ),
			this.videoPopUpOptions
		);

		const chiefsOffice = polygon(
			[
				[ 33.97395, -96.398715 ], // NW
				[ 33.973915, -96.3986 ], // NE
				[ 33.9738, -96.398645 ], // SE
				[ 33.97385, -96.39875 ], // SW
			],
			{ color: 'purple' }
		).addTo( this.map );
		chiefsOffice.bindPopup(
			this.videos.getPopup( 2 ),
			this.videoPopUpOptions
		);

		const eastCorridor = polygon(
			[
				[ 33.974295, -96.398615 ], // NW
				[ 33.974295, -96.398505 ], // NE
				[ 33.973905, -96.398525 ], // SE
				[ 33.973965, -96.39875 ], // SW
			],
			{ color: 'aqua' }
		).addTo( this.map );
		eastCorridor.bindPopup(
			this.videos.getPopup( 9 ),
			this.videoPopUpOptions
		);
	}

	private calcDistance( e ) {
		const location = e.latlng as L.LatLng;
		const distance = Math.round(
			location.distanceTo( this.CHOCTAW_HQ ) / 1000
		);

		// popup()
		// 	.setLatLng( this.CHOCTAW_HQ )
		// 	.setContent( `You are ${ distance }km from this point` )
		// 	.openOn( this.map );
	}

	private addMarkers() {
		marker( this.CHOCTAW_HQ, {
			icon: icon( {
				iconUrl: './mapImages/marker-icon-2x.png',
			} ),
		} ).addTo( this.map );
	}
}

new Map(
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
);
