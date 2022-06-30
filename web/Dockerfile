FROM php:apache

COPY ./html/favicon.ico /var/www/html
COPY ./html/index.php /var/www/html
COPY ./html/change.php /var/www/html

RUN docker-php-ext-install pdo_mysql