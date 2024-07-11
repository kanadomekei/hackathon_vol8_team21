FROM node:18

WORKDIR /app

COPY frontend/app/package*.json ./

RUN npm install -g

ENV PORT 4000

EXPOSE 4000

CMD ["npm", "run", "dev", "--", "-p", "4000"]