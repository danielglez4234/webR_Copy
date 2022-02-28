FROM node:15.13-alpine

RUN apk update && apk add git

RUN git clone https://github.com/danielglez4234/WebReport_Prototype

WORKDIR /WebReport_Prototype

ENV PATH="/WebReport_Prototype/node_modules/.bin:$PATH"

RUN npm install

RUN npm install -g react-scripts

RUN npm install react

RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]
