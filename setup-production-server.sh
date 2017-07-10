sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
npm install
sudo ln -s `which nodejs` /usr/local/bin/node
sudo npm install -g pm2
npm run build
pm2 start server/app.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u enewel3 --hp /home/enewel3
sudo apt-get install nginx
sudo cp nginx-config /etc/nginx/sites-available/react-webpack-boiler
sudo ln -s /etc/nginx/sites-available/react-webpack-boiler /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
