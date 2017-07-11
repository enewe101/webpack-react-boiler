FROM ubuntu
MAINTAINER Edward Newell

# Install dependencies
RUN apt-get update
RUN apt-get -qq -y install nodejs npm nginx
RUN npm install -g --quiet pm2

# Because of a name collision, the "node" command gets called "nodejs" on Ubuntu.  
# Force it to be "node" so that npm commands work properly.
RUN ln -s `which nodejs` /usr/local/bin/node

# Copy the code for the app into the container and build it.  First, only copy
# the package.json and run `npm install`, that way changes to app code don't cause 
# this step to repeat unless they alter dependencies
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --quiet

# Now copy all the rest of the files and build the app
COPY . /usr/src/app
RUN npm run build

# Configure nginx to serve the app
RUN cp nginx-config /etc/nginx/sites-available/react-webpack-boiler
RUN ln -s /etc/nginx/sites-available/react-webpack-boiler /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default

# Expose ports
EXPOSE 80 443

# Start the app under pm2 to keep it alive, and restart nginx reverse proxy
CMD pm2 start server/app.js && /etc/init.d/nginx restart && tail -f /dev/null
