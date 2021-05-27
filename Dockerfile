FROM node:15-alpine as base

WORKDIR /app
COPY [ "package.json", "package-lock.json", "./" ]

ENV PORT 3000
EXPOSE ${PORT}

# Installing packages for alpine
# RUN apk --no-cache add curl git

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
RUN npm ci --only=production
COPY . .
CMD [ "npm", "start" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]