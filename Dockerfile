# First line is to set the base image to use for the container
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app 

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies in the container
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application when the container starts
CMD ["npm", "start"]