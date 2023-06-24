<?php $pageName = 'events'; ?>

<?php include 'partials/header.php'; ?>

<?php include 'partials/body-top.php'; ?>

<style>
:root {
	--fc-list-event-hover-bg-color: '#1a252f';
	--fc-neutral-bg-color: hsl(0deg 0% 10%);
}
[data-bs-theme="light"] {
	--fc-neutral-bg-color: hsl(0deg 0% 10% / 10%);
}
div#calendar a {
	color: inherit !important;
}
@media (max-width: 768px) {
	div#calendar {
		min-height: 600px;
	}
	button.fc-button {
		font-size: 0.7em !important;
	}
}
</style>

<!-- Events START -->
<div class="card">
	<!-- Card header START -->
	<div class="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
		<h5 class="card-title mb-sm-0">Upcoming events</h5>
	</div>
	<!-- Card header END -->
	<!-- Card body START -->
	<div class="card-body">
		<div id='calendar'></div>
	</div>
</div>
<!-- Events START -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@6.1.8/index.global.min.js"></script>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
<script>
const regex = /img:(?<uri>[a-z.]+);/;

const apiKey = () => {
	if (url.has('dev'))
		return 'AIzaSyAvgLK89qnXxQax8IMLPVG4W6B37NZV0LA';

	return 'AIzaSyCrg7JZIhKZIgTgef_3MTOjer0lG72WXPY';
};

document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		firstDay: 1, // Monday
		headerToolbar: { center: 'listYear,timeGridWeek,dayGridMonth' },
		initialView: 'listYear',
		nextDayThreshold: '06:00:00',
		nowIndicator: true,
		googleCalendarApiKey: apiKey(),
		eventSources: [
			{
				id: 'sourceKink',
				googleCalendarId: 'c_1460e43f6b02ba57b9ed14513b3c4b12123a355995514ead248d94f709515471@group.calendar.google.com',
				color: '#8e24aa',
			},
			{
				id: 'sourcePublic',
				googleCalendarId: 'c_5445f4c4ec2673129d42d08b7befeb551fc9d4779c1e9f93ee2417c8dbe753c9@group.calendar.google.com',
				color: '#33b679',
			},
		],
		eventDidMount: function(info) {
			if (info.isPast)
				info.event.remove();

			let img = 'blank.png';
			let link = null;

			if (info.event.extendedProps.description) {
				const el = document.createElement('html');
				el.innerHTML = info.event.extendedProps.description;

				const firstHref = el.getElementsByTagName('a')[0] ?? null;
				if (firstHref)
					link = firstHref.href;

				const m = regex.exec(el.innerText);
				if (m !== null)
					img = m.groups.uri;
			}

			tippy(info.el, {
				trigger: 'click',
				interactive: true,
				ignoreAttributes: true,
				allowHTML: true,
				followCursor: 'horizontal',
				content: `
					<div class="d-sm-flex align-items-center">
						<div class="avatar avatar-xl">
							<img class="avatar-img rounded border border-white border-3" src="assets/images/events/${img}" alt="${info.event.title}">
						</div>
						<div class="ms-sm-4 mt-2 mt-sm-0">
							<a href="${link}">
								<small>Click here for</small><br>
								<h5 class="mb-1">Info & tickets</h5>
							</a>
							${info.event.source.id === 'sourceKink' ? '<p class="small mb-1"><span class="badge bg-danger">Kink</span></p>' : ''}
						</div>
					</div>
				`,
			});
		},
		eventClick: function(info) {
			info.jsEvent.preventDefault();
			return;
		},
	});

	if (!url.has('kink')) {
		const sourceKink = calendar.getEventSourceById('sourceKink');
		sourceKink.remove();
	}

	calendar.render();
});

</script>
<?php include 'partials/body-bottom.php'; ?>
