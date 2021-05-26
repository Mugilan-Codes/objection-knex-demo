FROM node:15-alpine as base
WORKDIR /app
COPY package.json .
ENV PORT 3000
EXPOSE ${PORT}

# Installing packages
FROM base as deps
RUN apk --no-cache add curl
RUN apk --no-cache add git

# make a stage for build folder (if babel is used)

# This is alternative for multi-stage builds
# --------------------------------
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#   then npm install; \
#   else npm install --only=production; \
#   fi
# --------------------------------

FROM base as prod
ENV NODE_ENV=production
COPY package-lock.json .
RUN npm ci --only=production
COPY . .
CMD [ "npm", "start" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]