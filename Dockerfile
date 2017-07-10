FROM ubuntu
#FROM node:4
MAINTAINER Edward Newell

# Update indexes before installing anything
RUN apt-get update

# Install node
RUN apt-get --assume-yes install nodejs
RUN apt-get --assume-yes install npm
RUN ln -s `which nodejs` /usr/local/bin/node

# Get pm2, which runs the app in keep-alive mode.  Configure it to run on startup
RUN npm install -g pm2

# Install nginx as the reverse proxy, configure it to serve the app
# (Note Nginx runs on startup by default, so don't need to set that up)
RUN apt-get --assume-yes  install nginx

# Expose ports
EXPOSE 80
EXPOSE 443

# Get the code for the app, and move into the app's directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js
RUN npm install

COPY . /usr/src/app
RUN npm run build

# Configure nginx to serve the app
RUN cp nginx-config /etc/nginx/sites-available/react-webpack-boiler
RUN ln -s /etc/nginx/sites-available/react-webpack-boiler /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default

# Start up the app in keep-alive mode, make it run on startup too
CMD pm2 start server/app.js
CMD env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u enewel3 --hp /home/enewel3

# Configure the firewall to only listen on port 80 and 443
CMD sudo ufw allow 'Nginx Full'

# Restart nginx reverse proxy
CMD systemctl restart nginx
