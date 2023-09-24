# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start"]