FROM node:16

WORKDIR /usr/src/app

# Copy package.json and package-lock.json for efficient dependency caching
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Environment variables - better handled via .env or Docker Compose (DO NOT hardcode sensitive data in Dockerfile)
ENV PORT=5000

CMD ["npm", "start"]
