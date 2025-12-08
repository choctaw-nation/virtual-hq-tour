import { ElementOptions } from './MapConstructor';

export class VideoPopups {
	/**
	 * Generates the Leaflet Popup
	 * @param video The videoId
	 */
	getPopup( video: ElementOptions[ 'video' ] ): string {
		const { locationLabel, title } = video;
		return `
		<div>
			<h2 class='fs-5'>${ locationLabel }</h2>
			<p><b>Video:</b> "${ title }"</p>
		</div>`;
	}

	/**
	 * Returns the lite-vimeo web component
	 * @param video    The video to return
	 * @param autoload Whether to autoload the video
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
