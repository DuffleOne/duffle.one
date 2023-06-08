rm -f ../public/*.html ../public/*.xml

php -f index.php > ../public/index.html
php -f events.php > ../public/events.html
php -f events_xml.php > ../public/events.xml
