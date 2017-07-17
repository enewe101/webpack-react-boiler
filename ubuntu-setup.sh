# Create a non-root user to run the app
echo creating non-root appuser
adduser --disabled-password --gecos '' appuser
echo appuser:$USER_PASS | chpasswd 
usermod -aG sudo appuser

# Install docker
# Remove any old version
echo installing docker...
apt-get remove docker docker-engine docker.io > /dev/null
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

# Make the appuser able to run docker
echo adding appuser to docker group...
groupadd docker
usermod -aG docker appuser
systemctl enable docker
	
# Install docker-compose
echo installing docker-compose
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
