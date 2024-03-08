import { ElementOptions } from './MapConstructor';

export class VideoPopups {
	/**
	 * Generates the Leaflet Popup
	 * @param video The videoId
	 */
	getPopup(
		video: ElementOptions[ 'video' ],
		isMobile: boolean,
		handleModal: CallableFunction
	): string {
		const container = document.createElement( 'div' );
		const header = document.createElement( 'h2' );
		header.classList.add( 'fs-5' );
		header.textContent = video.locationLabel;
		container.appendChild( header );
		const paragraph = document.createElement( 'p' );
		paragraph.innerHTML = `<b>Video:</b> "${ video.title }"`;
		container.appendChild( paragraph );
		if ( isMobile ) {
			const button = document.createElement( 'button' );
			button.classList.add( 'btn', 'btn-primary' );
			button.textContent = 'Watch Video';
			button.addEventListener( 'click', () => {
				console.log( 'click' );
				handleModal( video );
			} );
			container.appendChild( button );
		}
		return container.outerHTML;
	}

	/**
	 * Returns the lite-vimeo web component
	 * @param {title:string;id:number} video The video to return
	 * @param {boolean} autoload Whether to autoload the video
	 * @returns {title:string;id:string}
	 */
	getLiteVimeo(
		video: ElementOptions[ 'video' ],
		autoload: boolean = false
	): string {
		return `<lite-vimeo videotitle="${ video.title }" videoid="${
			video.id
		}" ${ autoload ? 'autoload' : '' }></lite-vimeo>`;
	}
}
