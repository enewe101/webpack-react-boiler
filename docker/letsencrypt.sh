# Install dependencies -- SSL/TLS cert management
apt-get install -y software-properties-common
add-apt-repository -y ppa:certbot/certbot		
apt-get update
apt-get install -y certbot

# Get a certificate
certbot certonly --webroot --webroot-path=/app -d aventamedia.com

# Make a diffie-helman group
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

