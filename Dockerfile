FROM node:14-alpine
WORKDIR /application
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
CMD ["npm","run","start"]
# RUN npm prune --production
# CMD ["node","./dist/main.js"]






# FROM node:14-alpine
# WORKDIR /application
# COPY ./ /application
