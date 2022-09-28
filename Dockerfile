# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Install app dependencies
#RUN npx prisma db pull

# Bundle app source
#COPY . .

# Install app dependencies
#RUN npx prisma migrate dev

# Bundle app source
COPY . .

# Install app dependencies
RUN npx prisma generate


# Bundle app source
COPY . .

COPY .env ./





# Bundle app source
COPY . .

EXPOSE 3030
EXPOSE $MYSQL_PORT

# RUN npx prisma migrate dev --create-only --name init
# run npx prisma migrate deploy


# Creates a "dist" folder with the production build
RUN npm run build

# RUN rm -rf /usr/src/app/prisma/migrations


# Start the server using the production build
CMD ["/bin/bash", "-c", "node dist/main;npx prisma db push;"]


