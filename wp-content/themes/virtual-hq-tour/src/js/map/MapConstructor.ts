/**
 * MapConstructor
 * Helps build the Leaflet Map with utility functions
 *
 * @package ChoctawNation
 * @subpackage Leaflet
 */
import { VideoPopups } from './VideoPopups';
import { VideoModal } from './VideoModal';
import {
	map,
	Map,
	polygon,
	circle,
	marker,
	icon,
	CRS,
	imageOverlay,
	PolylineOptions,
	CircleOptions,
	LatLngBoundsLiteral,
	LatLng,
	LatLngExpression,
	LatLngTuple,
} from 'leaflet';

type ElementTypes = 'marker' | 'circle' | 'polygon';
type ElementOptions = {
	coords: LatLngExpression[] | LatLngExpression | LatLng[];
	options?: CircleOptions | PolylineOptions;
	video: number;
};
/**
 * Helps build the Leaflet Map
 */
export class MapConstructor {
	protected map: Map;
	protected MIN_ZOOM;
	protected videos: VideoPopups;
	protected imageBase =
		'wp-content/themes/virtual-hq-tour/src/js/map/mapImages';

	/** Constructor */
	constructor() {
		this.videos = new VideoPopups();
		this.initMap();
	}

	/**
	 * Build the Map
	 */
	protected initMap() {
		this.map = map( 'map', {
			crs: CRS.Simple,
			minZoom: this.MIN_ZOOM,
		} );
		const bounds = [
			[ 0, 0 ],
			[ 300, 400 ],
		] as LatLngBoundsLiteral;

		imageOverlay( `${ this.imageBase }/map--floor-1.webp`, bounds, {
			interactive: true,
			className: 'object-fit-contain',
		} ).addTo( this.map );
		this.map.fitBounds( bounds );
	}

	/**
	 * Handles the modal for the video
	 * @param videoId The id of the video to open
	 */
	protected handleModal( videoId: number ) {
		new VideoModal(
			this.videos.getVideoTitle( videoId ),
			this.videos.getLiteVimeo( videoId )
		);
	}

	/**
	 * Adds a polygon to the map
	 * @param coords The coords of the polygon
	 * @param options The polygon Options
	 * @param video The id of the video to link up
	 *
	 * @link https://leafletjs.com/reference.html#polygon
	 */
	protected addPolygon(
		coords: LatLngTuple[],
		options: PolylineOptions,
		video: number
	) {
		return this.addElement( 'polygon', { coords, options, video } );
	}

	/**
	 * Adds a marker to the map
	 * @param coords The coords of the marker
	 * @param video the id of the video to link up
	 *
	 * @link https://leafletjs.com/reference.html#marker
	 */
	protected addMarker( coords: LatLngTuple, video: number ) {
		return this.addElement( 'marker', { coords, video } );
	}

	/**
	 * Adds a circle to the map
	 * @param coords The coords of the circle
	 * @param options The Circle Options
	 * @param video The id of the video to link up
	 *
	 * @link https://leafletjs.com/reference.html#circle
	 */
	protected addCircle(
		coords: LatLngTuple,
		options: CircleOptions,
		video: number
	) {
		return this.addElement( 'circle', { coords, options, video } );
	}

	/**
	 * Adds a Leaflet element to the map and binds a popup with the video elements to it
	 * @param {ElementTypes} type The type of element to add
	 * @param {ElementOptions} args The arguments to pass to the element
	 */
	protected addElement( type: ElementTypes, args: ElementOptions ) {
		let element;
		const { coords, options, video } = args;
		switch ( type ) {
			case 'marker':
				element = marker( coords as LatLngExpression, {
					icon: icon( {
						iconUrl: `${ this.imageBase }/marker-icon.png`,
						iconRetinaUrl: `${ this.imageBase }/marker-icon-2x.png`,
						iconSize: [ 25, 41 ],
					} ),
				} );
				break;
			case 'circle':
				element = circle( coords as LatLng, options );
				break;
			case 'polygon':
				element = polygon( coords as LatLngExpression[], options );
				break;
		}
		element
			.addTo( this.map )
			.bindPopup( this.videos.getPopup( video ) )
			.addEventListener( 'click', () => {
				this.handleModal( video );
			} );
		return element;
	}
}
