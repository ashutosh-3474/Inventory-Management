# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port (default 8080 or from ENV)
EXPOSE ${PORT}

# Start the app
CMD ["npm", "start"]
