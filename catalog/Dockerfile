# Use official Node.js image as base
FROM node:14

# Set working directory
WORKDIR /app

# Copy catalog package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
