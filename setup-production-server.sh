# Install node
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo ln -s `which nodejs` /usr/local/bin/node

# Get all node packages for this web app, build the app
npm install
npm run build

# Get pm2, which runs the app in keep-alive mode.  Configure it to run on startup
sudo npm install -g pm2
pm2 start server/app.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u enewel3 --hp /home/enewel3

# Install nginx as the reverse proxy, configure it to serve the app
# (Note Nginx runs on startup by default, so don't need to set that up)
sudo apt-get install nginx
sudo cp nginx-config /etc/nginx/sites-available/react-webpack-boiler
sudo ln -s /etc/nginx/sites-available/react-webpack-boiler /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Configure the firewall to only listen on port 80 and 443
sudo ufw allow 'Nginx Full'

# Restart nginx.  We're now serving the app
sudo systemctl restart nginx
