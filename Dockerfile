FROM node:22-alpine

RUN npm install pm2 -g

WORKDIR /app

COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.env.local ./
COPY ./.next/static ./.next/static
COPY ./ecosystem.config.js ./

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]