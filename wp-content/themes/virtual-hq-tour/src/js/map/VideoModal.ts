import { Modal } from 'bootstrap';
import { VideoObject } from './VideoPopups';

/**
 * Dynamically create a Bootstrap Modal with a lite-vimeo web component
 */
export class VideoModal {
	private modal: Modal;
	private modalTitle: HTMLElement;
	private modalBody: HTMLElement;

	/**
	 * Construct the Modal
	 * @param trigger The button that triggers the modal
	 * @param modalTitleContent The Modal Title
	 * @param modalBodyContent The lite-vimeo web component(s)
	 */
	constructor(
		videoId: number,
		modalTitleContent: string,
		modalBodyContent: string
	) {
		this.modalTitle = document.getElementById( 'videoModalLabel' )!;
		this.modalBody = document.getElementById( 'modal-video' )!;
		const trigger = document.getElementById(
			`modal-trigger-${ videoId }`
		)!;
		trigger.addEventListener( 'click', () => {
			this.initModal( modalTitleContent, modalBodyContent );
		} );
	}

	/**
	 * Construct the Modal's Contents
	 * @param trigger The button that triggers the modal
	 * @param modalTitleContent The Modal Title
	 * @param modalBodyContent The lite-vimeo web component(s)
	 */
	private initModal( modalTitleContent: string, modalBodyContent: string ) {
		const modalEl = document.getElementById( 'videoModal' )!;
		this.modal = new Modal( modalEl );
		this.modalTitle.textContent = modalTitleContent;
		this.modalBody.innerHTML = modalBodyContent;
		this.modal.show();
		modalEl.addEventListener(
			'hidden.bs.modal',
			this.resetModal.bind( this )
		);
	}

	private resetModal() {
		this.modalTitle.textContent = '';
		this.modalBody.innerHTML = '';
	}
}
