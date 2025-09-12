FROM node:20-alpine

WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 3000

CMD ["npm", "start"]
