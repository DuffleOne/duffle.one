<body>
	<header class="navbar-light fixed-top header-static bg-mode">

		<!-- Logo Nav START -->
		<nav class="navbar navbar-expand-lg">
			<div class="container">
				<!-- Logo START -->
				<a class="navbar-brand" href="index.html">
					<img class="light-mode-item navbar-brand-item" src="assets/images/arctic-fox.svg" alt="logo">
					<img class="dark-mode-item navbar-brand-item" src="assets/images/arctic-fox.svg" alt="logo">
				</a>
				<!-- Logo END -->

				<!-- Responsive navbar toggler -->
				<button class="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-animation">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</button>

				<!-- Main navbar START -->
				<div class="collapse navbar-collapse" id="navbarCollapse">


					<ul class="navbar-nav navbar-nav-scroll ms-auto">
						<!-- Nav item 4 Mega menu -->
						<li class="nav-item">
							<a class="nav-link" href="https://duffle.one">Home</a>
						</li>
					</ul>
				</div>
				<!-- Main navbar END -->
			</div>
		</nav>
		<!-- Logo Nav END -->
	</header>

	<!-- **************** MAIN CONTENT START **************** -->
	<main>

		<!-- Container START -->
		<div class="container">
			<div class="row g-4">

				<!-- Main content START -->
				<div class="col-lg-8 vstack gap-4">
					<!-- My profile START -->
					<div class="card">
						<!-- Cover image -->
						<div class="h-200px rounded-top" style="background-image:url(assets/images/bg/iceland.jpeg); background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
						<!-- Card body START -->
						<div class="card-body py-0">
							<div class="d-sm-flex align-items-start text-center text-sm-start">
								<div>
									<!-- Avatar -->
									<div class="avatar avatar-xxl mt-n5 mb-3">
										<img class="avatar-img rounded-circle border border-white border-3" src="assets/images/avatar/me_200.png" alt="Laura Miller">
									</div>
								</div>
								<div class="ms-sm-4 mt-sm-3">
									<!-- Info -->
									<h1 class="mb-0 h5">Laura Miller <i class="bi bi-patch-check-fill text-success small"></i></h1>
									<p>Duffle</p>
								</div>
							</div>
							<!-- List profile -->
							<ul class="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
								<li class="list-inline-item"><i class="bi bi-briefcase me-1"></i> <?php echo $jobTitle; ?></li>
								<li class="list-inline-item"><i class="bi bi-geo-alt me-1"></i> London, UK 🇬🇧</li>
								<li class="list-inline-item"><i class="bi bi-calendar2-plus me-1"></i> Last updated on <?php echo $lastUpdated; ?></li>
							</ul>
						</div>
						<!-- Card body END -->
						<div class="card-footer mt-3 pt-2 pb-0">
							<!-- Nav profile pages -->
							<ul class="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
								<?php foreach ($pages as $page) { ?>
									<li class="nav-item<?php echo isset($page['kink']) ? ' kink d-none' : false; ?>"><a class="nav-link kink-link <?php echo $pageName === $page['name'] ? 'active' : ''; ?>" href="<?php echo $page['href']; ?>"><?php echo $page['display']; ?></a></li>
								<?php } ?>
							</ul>
						</div>
					</div>
					<!-- My profile END -->
