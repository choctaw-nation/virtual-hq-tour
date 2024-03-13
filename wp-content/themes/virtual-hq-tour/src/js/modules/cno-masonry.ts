import macy from 'macy';
macy( {
	container: '#artwork',
	columns: 1,
	trueOrder: true,
	margin: 20,
	mobileFirst: true,
	waitForImages: true,
	breakAt: {
		767: {
			columns: 3,
		},
		991: {
			columns: 4,
		},
	},
} );
