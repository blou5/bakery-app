# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install


# Copy source code
COPY . .
RUN npm run build

# Expose Angular dev port
EXPOSE 4200

# Start Angular dev server with live reload & external access
CMD ["npm", "start"]
