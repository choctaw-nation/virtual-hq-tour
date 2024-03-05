import { Modal } from 'bootstrap';

export class VideoModal {
	private modal: Modal;
	private modalTitle: HTMLElement;
	private modalBody: HTMLElement;
	private modalTrigger: HTMLButtonElement;

	constructor( title: string, liteVimeo: string ) {
		this.initModal();
		this.modalTitle = document.getElementById( 'videoModalLabel' )!;
		this.modalBody = document.getElementById( 'modal-video' )!;
		this.modalTrigger = document.getElementById(
			'modal-trigger'
		) as HTMLButtonElement;

		this.modalTrigger.addEventListener( 'click', () => {
			this.initModalContents( title, liteVimeo );
			this.modal.show();
		} );
	}

	private initModal() {
		const modalEl = document.getElementById( 'videoModal' );
		this.modal = new Modal( modalEl );
		modalEl.addEventListener( 'hidden.bs.modal', () => {
			this.resetModal();
		} );
	}

	private initModalContents( title: string, liteVimeo: string ) {
		this.modalTitle.textContent = title;
		this.modalBody.innerHTML = liteVimeo;
	}

	private resetModal() {
		this.modalTitle.textContent = '';
		this.modalBody.innerHTML = '';
	}
}
