#!/bin/sh
echo `date` >> /app/renew.log
certbot renew --post-hook="service nginx restart" >> /app/renew.log 2>&1
echo '\n\n=====\n\n' >> /app/renew.log
