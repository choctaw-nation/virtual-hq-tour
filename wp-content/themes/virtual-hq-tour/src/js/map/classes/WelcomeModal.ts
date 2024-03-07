import BootstrapModal from '../../modules/BootstrapModal';

export default class WelcomeModal extends BootstrapModal {
	constructor() {
		const modal = document.querySelector( '#welcomeModal' )!;
		super( modal );
		if ( document.cookie.includes( 'welcomeModalDismissed=true' ) ) {
			return;
		} else {
			document.addEventListener(
				'DOMContentLoaded',
				() => {
					this.modal.show();
				},
				{ once: true }
			);
		}
	}

	protected resetModal() {
		const expirationDate = new Date();
		expirationDate.setMonth( expirationDate.getMonth() + 1 );
		document.cookie = `welcomeModalDismissed=true; expires=${ expirationDate.toUTCString() }`;
		this.modal.dispose();
		this.checkBodyStyles();
	}

	/**
	 * Forcibly reset the body styles that the modal changes
	 */
	private checkBodyStyles() {
		document.body.style.overflow = '';
		document.body.style.padding = '';
	}
}
new WelcomeModal();
