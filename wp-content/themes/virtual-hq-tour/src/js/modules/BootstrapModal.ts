import { Modal } from 'bootstrap';
/**
 * Dynamically create a Bootstrap Modal
 */
export default class BootstrapModal {
	protected modalEl: Element;
	public modal: Modal;
	protected modalTitle?: HTMLElement;
	protected modalBody?: HTMLElement;

	constructor( el: string | Element, config?: Partial< Modal.Options > ) {
		this.setModalEl( el );
		this.modal = new Modal( el, config );
		this.modalEl.addEventListener(
			'hidden.bs.modal',
			this.resetModal.bind( this )
		);
	}

	private setModalEl( el: string | Element ) {
		if ( typeof el === 'string' ) {
			this.modalEl = document.querySelector( el )!;
		} else {
			this.modalEl = el;
		}
	}

	protected resetModal() {
		if ( this.modalTitle && this.modalBody ) {
			this.modalTitle.textContent = '';
			this.modalBody.innerHTML = '';
		}
	}
}
