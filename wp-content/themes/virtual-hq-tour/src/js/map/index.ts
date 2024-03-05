import 'leaflet/dist/leaflet.css';
import '../../styles/components/leaflet.scss';
import { MapConstructor } from './MapConstructor';
import { LatLngTuple } from 'leaflet';

class Map extends MapConstructor {
	constructor( isMobile = true ) {
		super();
		this.MIN_ZOOM = isMobile ? 0 : 1;
		this.initFirstFloorZones();
	}

	protected initFirstFloorZones() {
		const topLeft = [ 225, 68 ] as LatLngTuple;
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

		const hallOfChiefs = this.addMarker(
			[ topLeft[ 0 ] - 60, topLeft[ 1 ] + 143 ],
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

		const rootsCafe = this.addMarker(
			[ topLeft[ 0 ], topLeft[ 1 ] + 130 ],
			7
		);
	}
}

const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

new Map( isMobile );
