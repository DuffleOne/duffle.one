<?php require_once 'conf/events.php'; ?>
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Laura's events</title>
		<link>https://duffle.one/events.html?kink</link>
		<description>List of events Laura is attending</description>
		<language>en-gb</language>
	</channel>

	<?php foreach ($events as $event) { ?>
		<item>
			<title><?php echo urlencode($event['name']); ?></title>
			<link><?php echo $event['link']; ?></link>
			<?php if ($event['kink']) { ?>
				<category>Kink</category>
			<?php } ?>
			<description>
				<?php echo $event['name']; ?>,
				Date: <?php echo $event['date']; ?>,
				Location: <?php echo $event['location']; ?>,
				Status: <?php echo ucwords($event['status']); ?>
			</description>
			<enclosure url="https://duffle.one/<?php echo $event['image']; ?>" length="<?php echo filesize(relativeURL($event['image'])); ?>" type="<?php echo mime_content_type(relativeURL($event['image'])); ?>" />
		</item>
	<?php } ?>
</rss>

<?php

function relativeURL($url)
{
    return "../public/{$url}";
}
