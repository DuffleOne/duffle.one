
</div>
				<!-- Main content END -->

				<!-- Right sidebar START -->
				<div class="col-lg-4">

					<div class="row g-4">

						<!-- Card START -->
						<div class="col-md-6 col-lg-12">
							<div class="card">
								<div class="card-header border-0 pb-0">
									<h5 class="card-title">About</h5>
									<!-- Button modal -->
								</div>
								<!-- Card body START -->
								<div class="card-body position-relative pt-0">
									<p>Hi! I avoid social media where I can, so I built this page instead.</p>
									<!-- Date time -->
									<ul class="list-unstyled mt-3 mb-0">
										<li class="mb-2"><i class="bi bi-discord fa-fw pe-1"></i> Discord: <strong>DuffleOne#0001</strong></li>
										<li class="mb-2"><i class="bi bi-envelope fa-fw pe-1"></i> Email: <strong>laura@duffle.one</strong></li>
									</ul>
								</div>
								<!-- Card body END -->
							</div>
						</div>
						<!-- Card END -->

						<!-- Card START -->
						<div class="col-md-6 col-lg-12 kink d-none">
							<div class="card">
								<div class="card-header border-0 pb-0">
									<h5 class="card-title">Kink</h5>
									<!-- Button modal -->
								</div>
								<!-- Card body START -->
								<div class="card-body position-relative pt-0">
									<p>I adore clubs, meeting new people, and getting involved in the London Kink community!</p>
									<p>I dom, but can switch for women. I am bisexual, but homoromantic.</p>
									<p>Happy to explore one night only fun, short term play partners, and long term romantic partners.</p>
								</div>
								<!-- Card body END -->
							</div>
						</div>
						<!-- Card END -->

						<!-- Card START -->
						<div class="col-md-6 col-lg-12">
							<div class="card">
								<!-- Card header START -->
								<div class="card-header d-flex justify-content-between border-0">
									<h5 class="card-title">Employment</h5>
								</div>
								<!-- Card header END -->
								<!-- Card body START -->
								<div class="card-body position-relative pt-0">
									<!-- Experience item START -->
									<div class="d-flex mb-2">
										<!-- Avatar -->
										<div class="avatar me-3">
											<img class="avatar-img rounded-circle" src="assets/images/employment/sexual-wellbeing.png" alt="Non-descript sexual wellbeing icon">
										</div>
										<!-- Info -->
										<div>
											<h6 class="card-title mb-0"><a href="#!">Sexual wellbeing company</a></h6>
											<p class="small">April 2022 - Present employment</p>
										</div>
									</div>
									<!-- Experience item END -->

									<!-- Experience item START -->
									<div class="d-flex mb-2">
										<!-- Avatar -->
										<div class="avatar me-3">
											<img class="avatar-img rounded-circle" src="assets/images/employment/car-insurance.jpg" alt="Non-descript car insurance icon">
										</div>
										<!-- Info -->
										<div>
											<h6 class="card-title mb-0"><a href="#!">Car insurance broker</a></h6>
											<p class="small">May 2016 - April 2022</p>
										</div>
									</div>
									<!-- Experience item END -->

									<!-- Experience item START -->
									<div class="d-flex mb-2">
										<!-- Avatar -->
										<div class="avatar me-3">
											<a href="https://en.wikipedia.org/wiki/Big_Tech"><img class="avatar-img rounded-circle" src="assets/images/employment/faang.png" alt="Non-descript FAANG company icon"></a>
										</div>
										<!-- Info -->
										<div>
											<h6 class="card-title mb-0"><a href="https://en.wikipedia.org/wiki/Big_Tech">FAANG company</a></h6>
											<p class="small mb-0">2015 - 2016</p>
										</div>
									</div>
									<!-- Experience item END -->

									<!-- Experience item START -->
									<div class="d-flex">
										<!-- Avatar -->
										<div class="avatar me-3">
											<img class="avatar-img rounded-circle" src="assets/images/employment/charity.png" alt="Non-descript charity icon">
										</div>
										<!-- Info -->
										<div>
											<h6 class="card-title mb-0"><a href="#!">Local charity</a></h6>
											<p class="small mb-0">2011 - 2015</p>
										</div>
									</div>
									<!-- Experience item END -->
								</div>
								<!-- Card body END -->
							</div>
						</div>
						<!-- Card END -->

					</div>

				</div>
				<!-- Right sidebar END -->

			</div> <!-- Row END -->
		</div>
		<!-- Container END -->

	</main>
	<!-- **************** MAIN CONTENT END **************** -->

	<!-- =======================
	JS libraries, plugins and custom scripts -->

	<!-- Bootstrap JS -->
	<script src="assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

	<!-- Vendors -->
	<script src="assets/vendor/dropzone/dist/dropzone.js"></script>
	<script src="assets/vendor/choices.js/public/assets/scripts/choices.min.js"></script>
	<script src="assets/vendor/glightbox-master/dist/js/glightbox.min.js"></script>
	<script src="assets/vendor/flatpickr/dist/flatpickr.min.js"></script>

	<!-- Theme Functions -->
	<script src="assets/js/functions.js"></script>

	<!-- Laura specific bits-->
	<script>
		const url = new URLSearchParams(location.search);
		if (url.has('kink')) {
			for (const e of document.querySelectorAll('.kink')) {
				e.classList.remove('d-none');
			}

			for (const l of document.querySelectorAll('.kink-link')) {
				const existing = l.getAttribute('href');
				l.setAttribute('href', `${existing}?kink`);
			}
		}
	</script>

</body>

</html>
