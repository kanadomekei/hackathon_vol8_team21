FROM node:18

WORKDIR /app

COPY frontend/app/package*.json ./

RUN npm install -g

RUN npm install -g next

ENV PORT 4000

EXPOSE 4000

CMD ["npm", "run", "dev"]
