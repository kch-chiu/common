FROM node:alpine

WORKDIR /app/common
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]