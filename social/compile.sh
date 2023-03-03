rm -f ../public/social/index.html ../public/social/about.html ../public/social/events.html

php -f index.php > ../public/social/index.html
php -f about.php > ../public/social/about.html
php -f events.php > ../public/social/events.html
