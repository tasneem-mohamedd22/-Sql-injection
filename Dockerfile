FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y python3 make g++ build-essential
RUN npm ci

COPY . .

EXPOSE 1234

# شغّل init-db.js أول ما السيرفر يشتغل
CMD ["sh", "-c", "node init-db.js && node server.js"]