import '@slightlyoff/lite-vimeo';

export class VideoPopups {
	private videos = {
		1: {
			title: 'Welcome to CNO Headquarters',
			id: 915716014,
		},
		2: {
			title: 'A Look Inside Chief’s Office',
			id: 915715080,
		},
		3: {
			title: 'Honoring Choctaw Culture through Design',
			id: 915714186,
		},
		4: {
			title: 'Inside the Lobby of CNO Headquarters',
			id: 915713112,
		},
		5: {
			title: 'Visiting Tribal Services and Security',
			id: 915712611,
		},
		6: {
			title: 'Visit the West Courtyard',
			id: 915712132,
		},
		7: {
			title: 'Grab a Bite at Roots Café and Learn about Our Journey',
			id: 915711025,
		},
		8: {
			title: 'Find Peace in the East Courtyard',
			id: 915710313,
		},
		9: {
			title: 'The Hall of Chiefs and Choctaw Code Talkers',
			id: 915709508,
		},
		10: {
			title: 'Up the Staircase',
			id: 915708766,
		},
		11: {
			title: 'Take a Break on the Third Floor',
			id: 915708082,
		},
		12: {
			title: 'Above the Third Floor',
			id: 915707711,
		},
		13: {
			title: 'Yakoke and Chi Pisa La Chike from Chief Batton',
			id: 915707281,
		},
	};

	constructor() {
		const welcome = document.getElementById( 'welcome-video' );
		if ( welcome ) {
			welcome.innerHTML = this.getLiteVimeo( 1 );
		}
	}

	/**
	 * Returns the lite-vimeo web component
	 * @param {number} video The video to return
	 * @returns {title:string;id:string}
	 */
	getPopup( video: number ): string {
		return `<div>
		<p>${ this.videos[ video ].title }</p>
		<button class='btn btn-primary' id='modal-trigger'>View Video</button>
		</div>`;
	}

	getLiteVimeo( video: number ): string {
		return `<lite-vimeo videotitle="${ this.videos[ video ].title }" videoid="${ this.videos[ video ].id }"></lite-vimeo>`;
	}

	/**
	 * Returns a video object
	 * @param {number} video The video to return
	 */
	getVideoObject( video: number ): { title: string; id: string } {
		return this.videos[ video ];
	}

	getVideoTitle( video: number ): string {
		return this.videos[ video ].title;
	}
}
