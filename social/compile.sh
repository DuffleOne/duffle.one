rm -f ../public/social/*.html ../public/social/*.xml

php -f index.php > ../public/social/index.html
php -f events.php > ../public/social/events.html
php -f events_xml.php > ../public/social/events.xml
