import { Collapse } from 'bootstrap';
type Locations = {
	[ layerControlGroup: string ]: {
		title: string;
		zones: {
			[ zone: string ]: {
				color: string;
				label: string;
				video: {
					id: number;
					title: string;
				};
			};
		};
	};
};

type AccordionItem = {
	/**
	 * CSS id String
	 * @example 'firstFloor'
	 *
	 * @var id
	 */
	id: string;

	/**
	 * Title of the Accordion Item
	 * @example 'First Floor'
	 *
	 * @var title
	 */
	title: string;

	/**
	 * Array of Legend items to add
	 *
	 * @var items
	 */
	items: Array< { color: string; text: string } >;
};

/**
 * Builds a Legend in the bottom right corner of the map
 */
export default class Legend {
	private accordion: HTMLElement;
	private id: string;
	private items: AccordionItem[];
	private legendToggle: HTMLButtonElement;

	constructor(
		locations: Locations | AccordionItem[],
		legendToggle: HTMLButtonElement
	) {
		this.id = 'legendAccordion';
		this.items = ! Array.isArray( locations )
			? this.getLocations( locations )
			: locations;
		this.legendToggle = legendToggle;
		this.setAccordion();
		this.items.forEach( ( item, index ) => {
			if ( 0 === item.items.length ) {
				return;
			}
			this.setAccordionItem( item, 0 === index );
		} );
	}

	/**
	 * Builds the accordion items from passed Locations object
	 * @param locations The locations to build
	 */
	private getLocations( locations: {} ): AccordionItem[] {
		const items: AccordionItem[] = [];
		Object.keys( locations ).forEach( ( key ) => {
			const { title, zones } = locations[ key ];
			const legendItems = Object.keys( zones ).map( ( zoneKey ) => {
				const { color, label } = zones[ zoneKey ];
				return {
					color,
					text: label,
				};
			} );
			items.push( {
				id: key,
				title,
				items: legendItems,
			} );
		} );
		return items;
	}

	/**
	 * Builds the accordion container
	 */
	private setAccordion() {
		const accordion = document.createElement( 'div' );
		accordion.classList.add( 'accordion', 'accordion-flush', 'm-1' );
		accordion.id = this.id;
		this.accordion = accordion;
	}

	/**
	 * Builds the accordion items and appends them to the accordion
	 * @param item The item to build
	 * @param isFirstItem Whether or not this is the first item
	 */
	private setAccordionItem( item: AccordionItem, isFirstItem: boolean ) {
		const accordionItem = document.createElement( 'div' );
		accordionItem.classList.add( 'accordion-item' );
		const header = this.getAccordionHeader( item, isFirstItem );
		accordionItem.appendChild( header );
		const body = this.getAccordionBody( item, isFirstItem );
		accordionItem.appendChild( body );
		this.accordion.appendChild( accordionItem );
	}

	/**
	 * Builds the accordion header
	 * @param item The item to build
	 * @param isFirstItem Whether or not this is the first item
	 */
	private getAccordionHeader(
		item: AccordionItem,
		isFirstItem: boolean
	): HTMLElement {
		const header = document.createElement( 'h2' );
		header.classList.add( 'accordion-header' );

		const button = document.createElement( 'button' );
		button.classList.add( 'accordion-button' );
		button.type = 'button';
		button.dataset.bsToggle = 'collapse';
		button.dataset.bsTarget = `#${ item.id }`;
		if ( isFirstItem ) {
			button.setAttribute( 'aria-expanded', 'true' );
		} else {
			button.setAttribute( 'aria-expanded', 'false' );
		}
		button.setAttribute( 'aria-controls', item.id );
		button.textContent = item.title;
		header.appendChild( button );
		return header;
	}

	/**
	 * Builds the Accordion Items
	 * @param item The item to build
	 * @param isFirstItem Whether or not this is the first item
	 */
	private getAccordionBody(
		item: AccordionItem,
		isFirstItem: boolean
	): HTMLElement {
		const bodyContainer = document.createElement( 'div' );
		const bodyClasses = [ 'accordion-collapse', 'collapse' ];
		if ( isFirstItem ) {
			bodyClasses.push( 'show' );
		}
		bodyContainer.classList.add( ...bodyClasses );
		bodyContainer.dataset.bsParent = `#${ this.id }`;
		const { id, items } = item;
		bodyContainer.id = id;
		const body = document.createElement( 'div' );
		body.classList.add( 'accordion-body' );

		items.forEach( ( { color, text } ) => {
			const legendItem = document.createElement( 'div' );
			const itemClasses = [
				'legend__item',
				'd-flex',
				'align-items-center',
				'gap-2',
			];
			legendItem.classList.add( ...itemClasses );
			const itemColor = document.createElement( 'div' );
			itemColor.classList.add( 'legend__color' );
			itemColor.style.backgroundColor = color;
			legendItem.appendChild( itemColor );
			const itemText = document.createElement( 'p' );
			itemText.classList.add( 'legend__text', 'small' );
			itemText.textContent = text;
			legendItem.appendChild( itemText );
			body.appendChild( legendItem );
		} );

		bodyContainer.appendChild( body );
		return bodyContainer;
	}

	/**
	 * Returns the legend accordion
	 */
	public getLegendMarkup(): string {
		return this.accordion.outerHTML;
	}
}
