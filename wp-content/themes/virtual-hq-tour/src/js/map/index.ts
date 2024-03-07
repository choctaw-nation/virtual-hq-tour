import WelcomeModal from './classes/WelcomeModal';
import Map from './classes/Map';

const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

new WelcomeModal();
new Map( isMobile );
