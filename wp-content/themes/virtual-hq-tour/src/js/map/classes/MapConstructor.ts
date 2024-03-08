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
	PolylineOptions,
	CircleOptions,
	LatLngBoundsLiteral,
	LatLng,
	LatLngExpression,
	LatLngTuple,
	Marker,
	Circle,
	Polygon,
	LayerGroup,
	Control,
	imageOverlay,
	ImageOverlay,
} from 'leaflet';

type ElementTypes = 'marker' | 'circle' | 'polygon';
export type ElementOptions = {
	coords: LatLngExpression[] | LatLngExpression | LatLng[];
	options?: CircleOptions | PolylineOptions;
	video: { title: string; id: number; locationLabel: string };
};

/**
 * Helps build the Leaflet Map
 */
export class MapConstructor {
	protected isMobile: boolean;
	protected map: Map;
	protected mapBounds: LatLngBoundsLiteral = [
		[ 0, 0 ],
		[ 300, 400 ],
	];
	protected MIN_ZOOM;
	protected videoPopups: VideoPopups;
	protected imageBase = 'wp-content/themes/virtual-hq-tour/src/js/map/assets';

	protected firstFloor: LayerGroup;
	protected secondFloor: LayerGroup;
	protected firstFloorImage: ImageOverlay;
	protected secondFloorImage: ImageOverlay;
	protected layerControl: Control.Layers;

	/** Constructor */
	constructor( isMobile = true ) {
		this.isMobile = isMobile;
		this.MIN_ZOOM = isMobile ? 0 : 1;
		this.videoPopups = new VideoPopups();
		this.initMap();
	}

	/**
	 * Build the Map
	 */
	protected initMap() {
		this.firstFloorImage = imageOverlay(
			`${ this.imageBase }/map--floor-1.webp`,
			this.mapBounds,
			{
				interactive: true,
				className: 'object-fit-contain',
			}
		);
		this.secondFloorImage = imageOverlay(
			`${ this.imageBase }/map--floor-2.webp`,
			this.mapBounds,
			{
				interactive: true,
				className: 'object-fit-contain',
			}
		);
		this.map = map( 'map', {
			crs: CRS.Simple,
			minZoom: this.MIN_ZOOM,
			layers: [ this.firstFloorImage ],
		} );

		this.map.fitBounds( this.mapBounds );
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
		video: ElementOptions[ 'video' ]
	): Polygon {
		return this.addElement( 'polygon', {
			coords,
			options,
			video,
		} ) as Polygon;
	}

	/**
	 * Adds a marker to the map
	 * @param coords The coords of the marker
	 * @param video the id of the video to link up
	 *
	 * @link https://leafletjs.com/reference.html#marker
	 */
	protected addMarker(
		coords: LatLngTuple,
		video: ElementOptions[ 'video' ]
	): Marker {
		return this.addElement( 'marker', { coords, video } ) as Marker;
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
		video: ElementOptions[ 'video' ]
	): Circle {
		return this.addElement( 'circle', {
			coords,
			options,
			video,
		} ) as Circle;
	}

	/**
	 * Adds a Leaflet element to the map and binds a popup with the video elements to it
	 * @param {ElementTypes} type The type of element to add
	 * @param {ElementOptions} args The arguments to pass to the element
	 */
	private addElement(
		type: ElementTypes,
		args: ElementOptions
	): Marker | Circle | Polygon {
		const { coords, options, video } = args;
		let element: Marker | Circle | Polygon;

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

		element.bindPopup(
			this.videoPopups.getPopup( video, this.isMobile, this.handleModal )
		);
		element.on( {
			click: () => {
				this.handleModal( video );
			},
			mouseover: ( ev ) => {
				ev.target.openPopup();
			},
		} );
		return element;
	}

	/**
	 * Handles the modal for the video
	 * @param videoId The id of the video to open
	 */
	private handleModal( video: ElementOptions[ 'video' ] ): void {
		new VideoModal(
			video.title,
			this.videoPopups.getLiteVimeo( video, false )
		);
	}
}
