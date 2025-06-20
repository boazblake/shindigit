# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port used by the development server (adjust if your dev server uses a different port, e.g., 5173 for Vite)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
