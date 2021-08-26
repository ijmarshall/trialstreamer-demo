FROM node:12-alpine

WORKDIR /app

ADD ./branding branding
ADD ./public public
ADD ./package.json package.json
ADD ./package-lock.json package-lock.json
ADD ./src src

RUN npm install
RUN echo "Starting Trialstreamer Demo in Development mode"

CMD npm run serve
