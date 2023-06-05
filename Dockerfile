FROM node:14
# Set the working directory inside the container
WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Expose the port that your application listens on
EXPOSE 8080

# Start the Node.js application
CMD ["npm", "start"]