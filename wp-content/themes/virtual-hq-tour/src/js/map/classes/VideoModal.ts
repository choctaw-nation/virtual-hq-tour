import BootstrapModal from '../../modules/BootstrapModal';

/**
 * Dynamically create a Bootstrap Modal with a lite-vimeo web component
 */
export class VideoModal extends BootstrapModal {
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
		const modalEl = document.getElementById( 'videoModal' )!;
		super( modalEl );
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
	 *
	 * @param modalTitleContent The Modal Title
	 * @param modalBodyContent The lite-vimeo web component(s)
	 */
	private initModal( modalTitleContent: string, modalBodyContent: string ) {
		this.modalTitle.textContent = modalTitleContent;
		this.modalBody.innerHTML = modalBodyContent;
		this.modal.show();
	}
}
