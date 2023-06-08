<?php $pageName = 'events'; ?>

<?php include 'partials/header.php'; ?>

<?php include 'partials/body-top.php'; ?>

<!-- Events START -->
<div class="card">
	<!-- Card header START -->
	<div class="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
		<h5 class="card-title mb-sm-0">Upcoming events</h5>
	</div>
	<!-- Card header END -->
	<!-- Card body START -->
	<div class="card-body">
		<!-- Events list START -->
		<?php foreach ($events as $event) { ?>
			<?php if ($event['kink']) { ?>
				<div class="row mb-4 kink d-none">
			<?php } else { ?>
				<div class="row mb-4">
			<?php } ?>
				<div class="d-sm-flex align-items-center">
					<!-- Avatar -->
					<div class="avatar avatar-xl">
						<img class="avatar-img rounded border border-white border-3" src="<?php echo $event['image']; ?>" alt="<?php echo $event['name']; ?>">
					</div>
					<div class="ms-sm-4 mt-2 mt-sm-0">
						<!-- Info -->
						<?php if (!is_null($event['link'])) { ?>
							<h5 class="mb-1"><a href="<?php echo $event['link']; ?>"><?php echo $event['name']; ?></a></h5>
						<?php } else { ?>
							<h5 class="mb-1"><?php echo $event['name']; ?></h5>
						<?php } ?>
						<?php if ($event['kink']) { ?>
							<p class="small mb-1"><span class="badge bg-danger">Kink</span></p>
						<?php } ?>
						<ul class="nav nav-stack small">
							<li class="nav-item">
								<i class="bi bi-calendar-check pe-1"></i> <?php echo $event['date']; ?>
							</li>
							<li class="nav-item">
								<i class="bi bi-geo-alt pe-1"></i> <?php echo $event['location']; ?>
							</li>
							<li class="nav-item">
								<i class="bi <?php echo $emoji[$event['status']]; ?> pe-1"></i> <?php echo ucwords($event['status']); ?>
							</li>
							<?php if (isset($event['items'])) { ?>
								<?php foreach ($event['items'] as $item) { ?>
									<li class="nav-item">
										<i class="bi <?php echo $item['emoji']; ?> pe-1"></i> <?php echo $item['text']; ?>
									</li>
								<?php } ?>
							<?php } ?>
						</ul>
					</div>
				</div>
			</div>
		<?php } ?>
		<!-- Events list END -->
	</div>
</div>
<div class="card">
	<div class="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
		<h5 class="card-title mb-sm-0">Recurring & past events</h5>
	</div>
	<div class="card-body">
		<div class="row mb-4">
			<div class="list-group">
				<a href="https://www.clubantichrist.co.uk/" class="kink d-none list-group-item list-group-item-action">Club Antichrist</a>
				<a href="https://www.bizarre-events.com/club-labrys" class="kink d-none list-group-item list-group-item-action">Club Labrys</a>
				<a href="https://londonalternativemarket.com/" class="kink d-none list-group-item list-group-item-action">LAM</a>
				<a href="https://klubverboten.com/dates" class="kink d-none list-group-item list-group-item-action">Klub Verboten</a>
				<a href="#" class="kink d-none list-group-item list-group-item-action">Le Boutique Bazaar</a>
				<a href="#" class="kink d-none list-group-item list-group-item-action">Naughties</a>
				<a href="#" class="kink d-none list-group-item list-group-item-action">DEBAUCHERY</a>
			</div>
		</div>
	</div>
	<!-- Card body END -->
</div>
<!-- Events START -->

<?php include 'partials/body-bottom.php'; ?>
