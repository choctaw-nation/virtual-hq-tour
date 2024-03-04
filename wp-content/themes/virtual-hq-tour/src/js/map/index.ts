import 'leaflet/dist/leaflet.css';
import '../../styles/components/leaflet.scss';
import {
	map,
	polygon,
	popup,
	circle,
	marker,
	icon,
	CRS,
	imageOverlay,
	PolylineOptions,
	CircleOptions,
	MarkerOptions,
	LatLngExpression,
} from 'leaflet';
import { VideoPopups } from './VideoPopups';
import { VideoModal } from './VideoModal';

class Map {
	private map: L.Map;
	private videos: VideoPopups;
	private MIN_ZOOM;
	private imageBase =
		'wp-content/themes/virtual-hq-tour/src/js/map/mapImages';

	constructor( isMobile = true ) {
		this.MIN_ZOOM = isMobile ? 0 : 1;
		this.videos = new VideoPopups();
		this.initMap();
		this.initFirstFloorZones();
	}

	private initMap() {
		this.map = map( 'map', {
			crs: CRS.Simple,
			minZoom: this.MIN_ZOOM,
		} );
		const bounds = [
			[ 0, 0 ],
			[ 300, 400 ],
		] as L.LatLngBoundsLiteral;

		imageOverlay( `${ this.imageBase }/map--floor-1.webp`, bounds, {
			interactive: true,
			className: 'object-fit-contain',
		} ).addTo( this.map );
		this.map.fitBounds( bounds );

		// this.addMarkers();
	}

	private initFirstFloorZones() {
		const topLeft = [ 225, 68 ] as L.LatLngExpression;

		const firstFloorWest = this.addPolygon(
			[
				topLeft,
				[ topLeft[ 0 ] - 55, topLeft[ 1 ] - 38 ], // BL
				[ topLeft[ 0 ] - 140, topLeft[ 1 ] + 80 ], // BR
				[ topLeft[ 0 ] - 82.5, topLeft[ 1 ] + 115 ], // TR
			],
			{ color: 'red' },
			5
		);

		const mainLobby = this.addCircle(
			[ topLeft[ 0 ] - 135, topLeft[ 1 ] + 115 ],
			{
				color: 'green',
				radius: 15,
			},
			4
		);

		const chiefsOffice = this.addMarker(
			[ topLeft[ 0 ] - 90, topLeft[ 1 ] + 127 ],
			2
		);

		const eastCourtyard = this.addPolygon(
			[
				[ topLeft[ 0 ] - 55, topLeft[ 1 ] + 150 ],
				[ topLeft[ 0 ] - 50, topLeft[ 1 ] + 160 ],
				[ topLeft[ 0 ] - 68, topLeft[ 1 ] + 200 ],
				[ topLeft[ 0 ] - 95, topLeft[ 1 ] + 200 ],
				[ topLeft[ 0 ] - 95, topLeft[ 1 ] + 150 ],
			],
			{ color: 'coral' },
			8
		);

		const eastCorridor = this.addMarker(
			[ topLeft[ 0 ] - 60, topLeft[ 1 ] + 140 ],
			9
		);

		const westCourtYard = this.addPolygon(
			[
				[ 300, 0 ],
				[ topLeft[ 0 ], 0 ],
				[ topLeft[ 0 ], topLeft[ 1 ] ],
				[ topLeft[ 0 ] - 82.5, topLeft[ 1 ] + 115 ],
				[ topLeft[ 0 ] - 80, topLeft[ 1 ] + 140 ],
				[ topLeft[ 0 ] - 55, topLeft[ 1 ] + 140 ],
				[ topLeft[ 0 ] - 40, topLeft[ 1 ] + 130 ],
				[ topLeft[ 0 ] - 30, topLeft[ 1 ] + 80 ],
				[ 300, topLeft[ 1 ] + 80 ],
			],
			{ color: 'gold' },
			6
		);
	}

	private handleModal( videoId: number ) {
		new VideoModal(
			this.videos.getVideoTitle( videoId ),
			this.videos.getLiteVimeo( videoId )
		);
	}

	private addPolygon( coords, options: PolylineOptions, video: number ) {
		return this.addElement( 'polygon', { coords, options, video } );
	}

	private addMarker( coords, video: number ) {
		return this.addElement( 'marker', { coords, video } );
	}

	private addCircle( coords, options: CircleOptions, video: number ) {
		return this.addElement( 'circle', { coords, options, video } );
	}

	private addElement(
		type: 'marker' | 'circle' | 'polygon',
		{
			coords,
			options,
			video,
		}: {
			coords: [];
			options?: CircleOptions | PolylineOptions;
			video: number;
		}
	) {
		let element;
		switch ( type ) {
			case 'marker':
				element = marker( [ ...coords ], {
					icon: icon( {
						iconUrl: `${ this.imageBase }/marker-icon.png`,
						iconRetinaUrl: `${ this.imageBase }/marker-icon-2x.png`,
					} ),
				} );
				break;
			case 'circle':
				element = circle( [ ...coords ], options );
				break;
			case 'polygon':
				element = polygon( [ ...coords ], options );
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

new Map(
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
);
