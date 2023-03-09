<?php require_once 'conf/events.php'; ?>
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Laura's events</title>
		<link>https://duffle.one/social/events.html?kink</link>
		<description>List of events Laura is attending</description>
		<language>en-gb</language>
	</channel>

	<?php foreach ($events as $event): ?>
		<item>
			<title><?= $event['name']; ?></title>
			<link><?= $event['link']; ?></link>
			<?php if ($event['kink']): ?>
				<category>Kink</category>
			<?php endif; ?>
			<description>
				<?= $event['name']; ?>,
				Date: <?= $event['date']; ?>,
				Location: <?= $event['location']; ?>,
				Status: <?= ucwords($event['status']); ?>
			</description>
			<enclosure url="https://duffle.one/social/<?= $event['image']; ?>" length="<?= filesize(relativeURL($event['image'])); ?>" type="<?= mime_content_type(relativeURL($event['image'])); ?>" />
		</item>
	<?php endforeach; ?>
</rss>

<?php

function relativeURL($url) {
	return "../public/social/{$url}";
}
