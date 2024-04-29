FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY dist/final.js .

EXPOSE 5000
CMD ["node","final.js"]