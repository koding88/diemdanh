FROM node:latest

# Cài đặt các gói cần thiết
RUN apt-get update && apt-get install -y wget gnupg2 ca-certificates \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update && apt-get install -y google-chrome-stable \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY dist/final.js .

EXPOSE 5000
CMD ["node","final.js"]