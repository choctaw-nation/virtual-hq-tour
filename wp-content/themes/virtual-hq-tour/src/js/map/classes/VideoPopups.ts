export type VideoObject = {
	locationLabel: string;
	title: string;
	id: number;
};

export class VideoPopups {
	private videos = {
		2: {
			locationLabel: "Chief's Office",
			title: 'A Look Inside Chief’s Office',
			id: 915715080,
		},
		3: {
			locationLabel: 'Front Entrance',
			title: 'Honoring Choctaw Culture through Design',
			id: 915714186,
		},
		4: {
			locationLabel: 'Main Lobby',
			title: 'Inside the Lobby of CNO Headquarters',
			id: 915713112,
		},
		5: {
			locationLabel: 'First Floor West',
			title: 'Visiting Tribal Services and Security',
			id: 915712611,
		},
		6: {
			locationLabel: 'West Courtyard',
			title: 'Visit the West Courtyard',
			id: 915712132,
		},
		7: {
			locationLabel: 'Roots Café',
			title: 'Grab a Bite at Roots Café and Learn about Our Journey',
			id: 915711025,
		},
		8: {
			locationLabel: 'East Courtyard',
			title: 'Find Peace in the East Courtyard',
			id: 915710313,
		},
		9: {
			locationLabel: 'East Corridor',
			title: 'The Hall of Chiefs and Choctaw Code Talkers',
			id: 915709508,
		},
		10: {
			locationLabel: 'Second Floor',
			title: 'Up the Staircase',
			id: 915708766,
		},
		11: {
			locationLabel: 'Third Floor',
			title: 'Take a Break on the Third Floor',
			id: 915708082,
		},
		12: {
			locationLabel: 'Fourth & Fifth Floors',
			title: 'Above the Third Floor',
			id: 915707711,
		},
		13: {
			locationLabel: 'Main Entrance',
			title: 'Yakoke and Chi Pisa La Chike from Chief Batton',
			id: 915707281,
		},
	};

	/**
	 * Generates the Leaflet Popup
	 * @param video The videoId
	 */
	getPopup( video: number | number[] ): string {
		if ( Array.isArray( video ) ) {
			const videosMarkup = video
				.map( ( vid, index, arr ) => {
					return `<div class='col-lg-${ 12 / arr.length } mb-2'>
			<h3 class='fs-6'>Video #${ index + 1 }</h3>
			<p class='m-0 mb-2'>${ this.videos[ vid ].title }</p>
			${ this.getModalTrigger( vid ) }
			</div>`;
				} )
				.join( '' );
			return `<div class='row mb-2'><div class='col-12'><h2 class="fs-5">${
				this.videos[ video[ 0 ] ].locationLabel
			}</h2></div>${ videosMarkup }</div>`;
		}
		return `<div>
		<h2 class='fs-5'>${ this.videos[ video ].locationLabel }</h2>
		<p>${ this.videos[ video ].title }</p>
		${ this.getModalTrigger( video ) }
		</div>`;
	}

	private getModalTrigger( video: number ): string {
		return `<button class='btn btn-primary modal-trigger' id='modal-trigger-${ video }'>Watch Video</button>`;
	}

	/**
	 * Returns the lite-vimeo web component
	 * @param {number} video The video to return
	 * @param {boolean} autoload Whether to autoload the video
	 * @returns {title:string;id:string}
	 */
	getLiteVimeo( video: number, autoload: boolean = false ): string {
		return `<lite-vimeo videotitle="${
			this.videos[ video ].title
		}" videoid="${ this.videos[ video ].id }" ${
			autoload ? 'autoload' : ''
		}></lite-vimeo>`;
	}

	/**
	 * Returns a video object
	 * @param {number} video The video to return
	 */
	getVideoObject( video: number ): VideoObject {
		return this.videos[ video ];
	}

	/**
	 * Returns the video's title
	 * @param {number} video The video to return
	 */
	getVideoTitle( video: number ): string {
		return this.videos[ video ].title;
	}
}
