FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies first to leverage Docker cache
COPY package*.json ./
RUN rm -f package-lock.json && rm -rf node_modules && npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite default port
# If your vite config uses a different port, change it here
EXPOSE 5173

# Command to run the Vite dev server
# The --host flag is important to make it accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]
