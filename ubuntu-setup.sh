# Create a non-root user to run the app
echo creating non-root user called $HOST_USER
adduser --disabled-password --gecos '' $HOST_USER
echo $HOST_USER:$HOST_USER_PASS | chpasswd
usermod -aG sudo $HOST_USER

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

# Install ssl certificate managing software
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install -y certbot
