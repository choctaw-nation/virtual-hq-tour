import 'leaflet/dist/leaflet.css';
import '../../../styles/components/leaflet.scss';
import { LatLngTuple, LayerGroup, control, layerGroup } from 'leaflet';
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
		const secondFloorPlaces = Object.values( this.initSecondFloorZones() );
		this.secondFloor = layerGroup( secondFloorPlaces ).addTo( this.map );

		this.outdoorZones = layerGroup(
			Object.values( this.initOutdoorZones() )
		).addTo( this.map );
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

		const firstFloorPlaces = Object.values( this.initFirstFloorZones() );
		this.firstFloor = layerGroup( firstFloorPlaces ).addTo( this.map );
	}

	/**
	 * Inits the First Floor Elements of the Map
	 * @returns an object of Leaflet Elements (Markers, Polygons, Circles, etc.)
	 */
	private initFirstFloorZones(): Object {
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

		const chiefsOffice = this.addMarker(
			[ this.topLeft[ 0 ] - 90, this.topLeft[ 1 ] + 127 ],
			2
		);

		const hallOfChiefs = this.addPolygon(
			[
				[ this.topLeft[ 0 ], this.topLeft[ 1 ] + 143 ],
				[ this.topLeft[ 0 ], this.topLeft[ 1 ] + 150 ],
				[ this.topLeft[ 0 ] - 60, this.topLeft[ 1 ] + 143 ],
			],
			{ color: 'blue' },
			9
		);

		const rootsCafe = this.addMarker(
			[ this.topLeft[ 0 ], this.topLeft[ 1 ] + 130 ],
			7
		);

		return {
			rootsCafe,
			hallOfChiefs,
			firstFloorWest,
			chiefsOffice,
			mainLobby,
		};
	}

	/**
	 * Inits the Outdoor Elements of the Map
	 * @returns an object of Leaflet Elements (Markers, Polygons, Circles, etc.)
	 */
	private initOutdoorZones(): Object {
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
				color: 'purple',
			},
			3
		);

		return {
			eastCourtyard,
			westCourtyard,
			frontEntrance,
		};
	}

	private initSecondFloorZones(): Object {
		const secondFloor = this.addMarker(
			[ this.topLeft[ 0 ] - 110, this.topLeft[ 1 ] + 125 ],
			10
		);
		return { secondFloor };
	}
}
