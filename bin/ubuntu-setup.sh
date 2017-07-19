# Enable firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Create a non-root user to run the app
echo creating non-root user called $HOST_USER
useradd --create-home $HOST_USER
echo $HOST_USER:$HOST_USER_PASS | chpasswd
usermod -aG sudo $HOST_USER

## If we're going to be running with SSL/TLS, copy certificate / key / group
#if [ ! -z $USE_SSL ] || [ $USE_SSL -ne 0 ]; then
#	mkdir /home/$HOST_USER/cert;
#	cp /etc/letsencrypt/live/example.com/* /home/$HOST/cert;
#	cp /etc/ssl/certs/dhparam.pem /home/$HOST/cert;
#fi

# Install docker
# Remove any old version
echo installing docker...
apt-get remove docker docker-engine docker.io &> /dev/null
apt-get update > /dev/null
apt-get install -y\
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common > /dev/null
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
apt-key fingerprint 0EBFCD88 | grep fingerprint
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable" > /dev/null
apt-get update > /dev/null
apt-get install -y docker-ce

# Make the HOST_USER able to run docker
echo adding $HOST_USER to docker group...
groupadd docker
usermod -aG docker $HOST_USER
systemctl enable docker

# Install docker-compose
echo installing docker-compose
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

