# NestJS Dockerfile
FROM node:20

# Install wait-for-it
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build 

# Expose the port the app runs on
EXPOSE 3000

# Start the NestJS application and wait for PostgreSQL to be ready
CMD ["./wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start:prod"]