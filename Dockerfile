FROM node:14-alpine

ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm install -g nodemon && npm install
CMD ["nodemon", "index.js"]