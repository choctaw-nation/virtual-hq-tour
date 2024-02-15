import { tileLayer, marker, circle } from 'leaflet/dist/leaflet.js';
export function enableGeolocation( leafletMap, CHOCTAW_HQ ) {
	tileLayer( 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '© OpenStreetMap',
	} ).addTo( leafletMap );
	leafletMap.locate( { setView: true, maxZoom: 19 } );
	leafletMap.setView( CHOCTAW_HQ.latlng, CHOCTAW_HQ.zoom );
	leafletMap.on( 'locationfound', ( e ) => {
		var radius = e.accuracy;

		marker( e.latlng )
			.addTo( leafletMap )
			.bindPopup( 'You are within ' + radius + ' meters from this point' )
			.openPopup();

		circle( e.latlng, radius ).addTo( leafletMap );
	} );

	leafletMap.on( 'locationerror', ( e ) => {
		alert( e.message );
	} );
}
