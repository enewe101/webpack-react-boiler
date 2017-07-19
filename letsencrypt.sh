# Install dependencies -- SSL/TLS cert management

# Get a certificate
certbot certonly --webroot --webroot-path=/app -d $HOST

# Make a diffie-helman group
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

# Copy the certificate into the /app dir.  This copies the cert file to the
# host, since /app is a mapped volume
mkdir /app/cert
cp /etc/letsencrypt/archive/$HOST/* /app/cert
cp /etc/ssl/certs/dhparam.pem
