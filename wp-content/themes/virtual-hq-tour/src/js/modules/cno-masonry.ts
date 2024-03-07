import macy from 'macy';
macy( {
	container: '#artwork',
	columns: 1,
	margin: 20,
	mobileFirst: true,
	breakAt: {
		767: {
			columns: 3,
		},
		991: {
			columns: 4,
		},
	},
} );
