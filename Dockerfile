FROM node:alpine3.12

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies 
RUN npm install 

LABEL name="food-delivery" version="1.0"


CMD [ "npm", "start" ]