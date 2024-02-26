export const API_KEY =
	'AAPK7a2b549bd6fa4a39a438068e6867c31fNV0Pk_PHYqWZaUhe9vFzC0zsB8sWt_6AtHZh4FOPKiWBI-qVJB5fvIQLD55EcrSc';

type gradientTuple = [ string, string ];
export const marker = (
	gradientOne: gradientTuple = [ 'rgb(18,111,198)', 'rgb(76,156,209)' ],
	gradientTwo: gradientTuple = [ 'rgb(46,108,151)', 'rgb(56,131,183)' ]
) => {
	return `<svg viewBox="0 0 500 820" version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linecap: round;"><defs><linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(2.30025e-15,-37.566,37.566,2.30025e-15,416.455,540.999)" id="map-marker-38-f"><stop offset="0" stop-color="${ gradientOne[ 0 ] }"/><stop offset="1" stop-color="${ gradientOne[ 1 ] }"/></linearGradient><linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.16666e-15,-19.053,19.053,1.16666e-15,414.482,522.486)" id="map-marker-38-s"><stop offset="0" stop-color="${ gradientTwo[ 0 ] }"/><stop offset="1" stop-color="${ gradientTwo[ 1 ] }"/></linearGradient></defs><g transform="matrix(19.5417,0,0,19.5417,-7889.1,-9807.44)"><path d="M416.544,503.612C409.971,503.612 404.5,509.303 404.5,515.478C404.5,518.256 406.064,521.786 407.194,524.224L416.5,542.096L425.762,524.224C426.892,521.786 428.5,518.433 428.5,515.478C428.5,509.303 423.117,503.612 416.544,503.612ZM416.544,510.767C419.128,510.784 421.223,512.889 421.223,515.477C421.223,518.065 419.128,520.14 416.544,520.156C413.96,520.139 411.865,518.066 411.865,515.477C411.865,512.889 413.96,510.784 416.544,510.767Z" stroke-width="1.1px" fill="url(#map-marker-38-f)" stroke="url(#map-marker-38-s)"/></g></svg>
	`;
};
