import 'leaflet/dist/leaflet.css';
import '../../../styles/components/leaflet.scss';
import {
	Circle,
	LatLngTuple,
	LayerGroup,
	Marker,
	Polygon,
	control,
	layerGroup,
} from 'leaflet';
import { MapConstructor } from './MapConstructor';

export default class Map extends MapConstructor {
	private outdoorZones: LayerGroup;

	/**
	 * The Top Left Corner of the First Floor West Wing
	 */
	private topLeft: LatLngTuple;

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
		const firstFloorWest = this.addPolygon(
			[
				this.topLeft,
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] - 38 ], // BL
				[ this.topLeft[ 0 ] - 140, this.topLeft[ 1 ] + 80 ], // BR
				[ this.topLeft[ 0 ] - 82.5, this.topLeft[ 1 ] + 115 ], // TR
			],
			{ color: 'red' },
			5
		);

		const mainLobby = this.addCircle(
			[ this.topLeft[ 0 ] - 135, this.topLeft[ 1 ] + 115 ],
			{
				color: 'green',
				radius: 20,
			},
			4
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
			{ color: 'purple' },
			2
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
			{ color: 'blue' },
			9
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
			{ color: 'brown' },
			7
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
		const eastCourtyard = this.addPolygon(
			[
				[ this.topLeft[ 0 ] - 55, this.topLeft[ 1 ] + 150 ],
				[ this.topLeft[ 0 ] - 50, this.topLeft[ 1 ] + 160 ],
				[ this.topLeft[ 0 ] - 68, this.topLeft[ 1 ] + 200 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 200 ],
				[ this.topLeft[ 0 ] - 95, this.topLeft[ 1 ] + 150 ],
			],
			{ color: 'coral' },
			8
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
			{ color: 'gold' },
			6
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
				color: 'white',
			},
			3
		);

		return [ eastCourtyard, westCourtyard, frontEntrance ];
	}

	private initSecondFloorZones(): Array< Marker > {
		const secondFloor = this.addMarker(
			[ this.topLeft[ 0 ] - 110, this.topLeft[ 1 ] + 125 ],
			10
		);
		return [ secondFloor ];
	}

	private addLegend() {
		const legend = control( { position: 'bottomright' } );
		legend.onAdd = () => {
			const div = document.createElement( 'div' );
			div.innerHTML = `
				<div class="legend">
					<div class="legend__item">
						<div class="legend__color" style="background-color: red;"></div>
						<p class="legend__text">First Floor West Wing</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: green;"></div>
						<p class="legend__text">Main Lobby</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: purple;"></div>
						<p class="legend__text">Chiefs Office</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: blue;"></div>
						<p class="legend__text">Hall of Chiefs</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: brown;"></div>
						<p class="legend__text">Roots Cafe</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: coral;"></div>
						<p class="legend__text">East Courtyard</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: gold;"></div>
						<p class="legend__text">West Courtyard</p>
					</div>
					<div class="legend__item">
						<div class="legend__color" style="background-color: white;"></div>
						<p class="legend__text">Front Entrance</p>
					</div>
				</div>
			`;
			return div;
		};
		legend.addTo( this.map );
	}
}
