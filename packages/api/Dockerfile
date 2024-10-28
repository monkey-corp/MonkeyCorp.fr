# Base API image for PRODUCTION
FROM  node:23-slim AS prod

ENV NODE_ENV=production
WORKDIR /api

# Copy project files into the container

# Sources
COPY ./src ./src
# Config files
COPY ./*.json .

# Install dependencies


RUN npm install

# Entrypoint

CMD [ "npm", "run", "start" ]

# Base API image for DEVELOPMENT
FROM node:23-alpine3.19 AS dev
WORKDIR /api

ENV NODE_ENV=development

# Get the production image's files

COPY --from=prod /api .

# Copy test sources into the container

COPY ./test ./test

# Install dev dependencies

RUN npm install

CMD [ "npm", "run", "serve" ]
