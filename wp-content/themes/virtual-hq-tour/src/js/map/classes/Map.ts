import 'leaflet/dist/leaflet.css';
import '../../../styles/components/leaflet.scss';
import {
	Circle,
	Control,
	LatLngTuple,
	LayerGroup,
	Marker,
	Polygon,
	control,
	layerGroup,
} from 'leaflet';
import { MapConstructor } from './MapConstructor';
import Legend from './Legend';

export default class Map extends MapConstructor {
	private outdoorZones: LayerGroup;

	/**
	 * The Top Left Corner of the First Floor West Wing
	 */
	private topLeft: LatLngTuple;

	private locations = {
		firstFloor: {
			title: 'First Floor',
			zones: {
				firstFloorWest: {
					color: 'red',
					label: 'First Floor West',
					video: {
						id: 915712611,
						title: 'Visiting Tribal Services and Security',
					},
				},
				chiefsOffice: {
					color: 'purple',
					label: 'Chiefs Office',
					video: {
						id: 915715080,
						title: 'A Look Inside Chief’s Office',
					},
				},
				mainLobby: {
					color: 'green',
					label: 'Main Lobby',
					video: {
						id: 915713112,
						title: 'Inside the Lobby of CNO Headquarters',
					},
				},
				hallOfChiefs: {
					color: 'blue',
					label: 'Hall of Chiefs',
					video: {
						id: 915709508,
						title: 'The Hall of Chiefs and Choctaw Code Talkers',
					},
				},
				rootsCafe: {
					color: 'brown',
					label: 'Roots Café',
					video: {
						id: 915711025,
						title: 'Grab a Bite at Roots Café and Learn about Our Journey',
					},
				},
			},
		},
		outdoorZones: {
			title: 'Outdoor Zones',
			zones: {
				eastCourtyard: {
					color: 'coral',
					label: 'East Courtyard',
					video: {
						id: 915710313,
						title: 'Find Peace in the East Courtyard',
					},
				},
				westCourtyard: {
					color: 'gold',
					label: 'West Courtyard',
					video: {
						id: 915712132,
						title: 'Visit the West Courtyard',
					},
				},
				frontEntrance: {
					color: 'white',
					label: 'Front Entrance',
					video: {
						id: 915714186,
						title: 'Honoring Choctaw Culture through Design',
					},
				},
			},
		},
		secondFloor: {
			title: 'Second Floor',
			zones: {
				secondFloor: {
					color: 'black',
					label: 'Second Floor',
					video: {
						id: 915708766,
						title: 'Up the Staircase',
					},
				},
			},
		},
	};

	/** Constructor */
	constructor( isMobile = true ) {
		super( isMobile );
		this.topLeft = [ 225, 68 ] as LatLngTuple;
		this.initLayerControl();
		this.map.addEventListener( 'baselayerchange', ( ev ) => {
			const { name } = ev;
			switch ( name ) {
				case 'First Floor':
					this.secondFloor.remove();
					this.firstFloor.addTo( this.map );
					break;
				case 'Second Floor':
					this.firstFloor.remove();
					this.secondFloor.addTo( this.map );
					break;
			}
		} );
	}

	/**
	 * Inits the Layer Control of the Map
	 */
	private initLayerControl() {
		this.secondFloor = layerGroup( [
			this.secondFloorImage,
			...this.initSecondFloorZones(),
		] );

		this.outdoorZones = layerGroup( this.initOutdoorZones() ).addTo(
			this.map
		);

		this.firstFloor = layerGroup( [
			this.firstFloorImage,
			...this.initFirstFloorZones(),
		] ).addTo( this.map );

		this.layerControl = control
			.layers(
				{
					'Second Floor': this.secondFloorImage,
					'First Floor': this.firstFloorImage,
				},
				{
					'Outdoor Zones': this.outdoorZones,
				}
			)
			.addTo( this.map );

		this.addLegend();
	}

	/**
	 * Inits the First Floor Elements of the Map
	 * @returns an object of Leaflet Elements (Markers, Polygons, Circles, etc.)
	 */
	private initFirstFloorZones(): Array< Polygon | Circle > {
		const { zones } = this.locations.firstFloor;
		const firstFloorWest = this.addPolygon(
			[
				this.topLeft,
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] - 38 ], // BL
				[ this.topLeft[ 0 ] - 140, this.topLeft[ 1 ] + 80 ], // BR
				[ this.topLeft[ 0 ] - 82.5, this.topLeft[ 1 ] + 115 ], // TR
			],
			{ color: zones.firstFloorWest.color },
			{
				...zones.firstFloorWest.video,
				locationLabel: zones.firstFloorWest.label,
			}
		);

		const mainLobby = this.addCircle(
			[ this.topLeft[ 0 ] - 135, this.topLeft[ 1 ] + 115 ],
			{
				color: zones.mainLobby.color,
				radius: 20,
			},
			{
				...zones.mainLobby.video,
				locationLabel: zones.mainLobby.label,
			}
		);

		const bLChiefsOffice = [
			this.topLeft[ 0 ] - 108,
			this.topLeft[ 1 ] + 110,
		] as LatLngTuple;

		const chiefsOffice = this.addPolygon(
			[
				bLChiefsOffice, // BL
				[ bLChiefsOffice[ 0 ] + 30, bLChiefsOffice[ 1 ] + 10 ], // TL
				[ this.topLeft[ 0 ] - 83, this.topLeft[ 1 ] + 142 ], // TR
				[ bLChiefsOffice[ 0 ] - 8, bLChiefsOffice[ 1 ] + 22 ], // BR
			],
			{ color: zones.chiefsOffice.color },
			{
				...zones.chiefsOffice.video,
				locationLabel: zones.chiefsOffice.label,
			}
		);

		const hallOfChiefs = this.addPolygon(
			[
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] + 140 ], // tl
				[ this.topLeft[ 0 ] - 83, this.topLeft[ 1 ] + 142 ], // bl
				[ this.topLeft[ 0 ] - 83, this.topLeft[ 1 ] + 144 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 140 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 150 ],
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] + 150 ], // tr
			],
			{ color: zones.hallOfChiefs.color },
			{
				...zones.hallOfChiefs.video,
				locationLabel: zones.hallOfChiefs.label,
			}
		);

		const rootsCafe = this.addPolygon(
			[
				[ this.topLeft[ 0 ] - 37, this.topLeft[ 1 ] + 136 ],
				[ this.topLeft[ 0 ] - 28, this.topLeft[ 1 ] + 82 ], // BL
				[ this.topLeft[ 0 ] + 22, this.topLeft[ 1 ] + 92 ], // TL
				[ this.topLeft[ 0 ] + 8, this.topLeft[ 1 ] + 160 ],
				[ this.topLeft[ 0 ], this.topLeft[ 1 ] + 175 ], // TR
				[ this.topLeft[ 0 ] - 38, this.topLeft[ 1 ] + 158 ], // BR
				[ this.topLeft[ 0 ] - 30, this.topLeft[ 1 ] + 136 ], // BR
			],
			{ color: zones.rootsCafe.color },
			{
				...zones.rootsCafe.video,
				locationLabel: zones.rootsCafe.label,
			}
		);

		return [
			rootsCafe,
			hallOfChiefs,
			firstFloorWest,
			chiefsOffice,
			mainLobby,
		];
	}

	/**
	 * Inits the Outdoor Elements of the Map
	 * @returns an object of Leaflet Elements (Markers, Polygons, Circles, etc.)
	 */
	private initOutdoorZones(): Array< Polygon > {
		const { zones } = this.locations.outdoorZones;
		const eastCourtyard = this.addPolygon(
			[
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] + 150 ],
				[ this.topLeft[ 0 ] - 50, this.topLeft[ 1 ] + 160 ],
				[ this.topLeft[ 0 ] - 68, this.topLeft[ 1 ] + 200 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 200 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 150 ],
			],
			{ color: zones.eastCourtyard.color },
			{
				...zones.eastCourtyard.video,
				locationLabel: zones.eastCourtyard.label,
			}
		);

		const westCourtyard = this.addPolygon(
			[
				[ 300, 0 ],
				[ this.topLeft[ 0 ], 0 ],
				[ this.topLeft[ 0 ], this.topLeft[ 1 ] ],
				[ this.topLeft[ 0 ] - 82.5, this.topLeft[ 1 ] + 115 ],
				[ this.topLeft[ 0 ] - 80, this.topLeft[ 1 ] + 140 ],
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] + 140 ],
				[ this.topLeft[ 0 ] - 40, this.topLeft[ 1 ] + 130 ],
				[ this.topLeft[ 0 ] - 30, this.topLeft[ 1 ] + 80 ],
				[ 300, this.topLeft[ 1 ] + 80 ],
			],
			{ color: zones.westCourtyard.color },
			{
				...zones.westCourtyard.video,
				locationLabel: zones.westCourtyard.label,
			}
		);

		const frontEntrance = this.addPolygon(
			[
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] - 38 ],
				[ this.topLeft[ 0 ] - 55, 0 ],
				[ 0, 0 ],
				[ 0, 400 ],
				[ 60, 400 ],
				[ 60, this.topLeft[ 1 ] + 140 ],
				[ 65, this.topLeft[ 1 ] + 100 ],
				[ this.topLeft[ 0 ] - 140, this.topLeft[ 1 ] + 80 ], // BR
			],
			{
				color: zones.frontEntrance.color,
			},
			{
				...zones.frontEntrance.video,
				locationLabel: zones.frontEntrance.label,
			}
		);

		return [ eastCourtyard, westCourtyard, frontEntrance ];
	}

	/**
	 * Inits the Second Floor Elements of the Map
	 * @returns an object of Leaflet Elements (Markers, Polygons, Circles, etc.)
	 */
	private initSecondFloorZones(): Array< Marker > {
		const { zones } = this.locations.secondFloor;
		const secondFloor = this.addMarker(
			[ this.topLeft[ 0 ] - 110, this.topLeft[ 1 ] + 125 ],
			{
				...zones.secondFloor.video,
				locationLabel: zones.secondFloor.label,
			}
		);
		return [ secondFloor ];
	}

	/**
	 * Adds the Legend to the Map
	 */
	private addLegend() {
		const legendControl = new Control( { position: 'bottomright' } );
		const legendClasses = [
			'legend',
			'fs-6',
			'd-flex',
			'flex-column',
			'gap-2',
		];
		legendControl.onAdd = ( map ) => {
			const div = document.createElement( 'div' );
			div.classList.add( ...legendClasses );
			div.id = 'legend';
			const legendToggle = document.createElement( 'button' );
			legendToggle.classList.add( 'fs-6', 'btn', 'btn-secondary' );
			legendToggle.textContent = 'Show Legend';
			legendToggle.addEventListener( 'click', () => {
				const legend = new Legend( this.locations, legendToggle );
				div.innerHTML = legend.getLegendMarkup();
			} );
			div.appendChild( legendToggle );
			return div;
		};
		legendControl.addTo( this.map );
	}
}
