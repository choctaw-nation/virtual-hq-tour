import { marker, circle } from 'leaflet/dist/leaflet.js';
export function enableGeolocation( leafletMap, CHOCTAW_HQ ) {
	leafletMap.locate( {
		setView: true,
		maxZoom: 19,
		enableHighAccuracy: true,
	} );

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
