<?php
/**
 * The Welcome Modal
 * Displays on App load, and stays dismissed for 1 month
 *
 * @package ChoctawNation
 */

?>
<div class="modal fade" id="welcomeModal" tabindex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-3 text-primary" id="welcomeModalLabel">
					Welcome to the Choctaw Nation Virtual HQ Tour
				</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<p>Take a virtual tour of the Choctaw Nation Headquarters in Durant, Oklahoma. Explore the campus and learn about the history of the Choctaw Nation.</p>
					</div>
					<div class="col-12 mt-4">
						<div class="ratio ratio-16x9" id='welcome-video'>
							<lite-vimeo videoid="915716014" videotitle="Welcome to the Choctaw Nation of Oklahoma's Headquarters"></lite-vimeo>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="btn btn-secondary fs-5" data-bs-dismiss="modal">Dismiss</div>
			</div>
		</div>
	</div>
</div>
