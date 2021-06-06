# Objection ORM using Knex on MySql

## Practice setup for objection knex with docker

### TODO

- Remove babel and use `.mjs` file extension instead of `.js`
- Complete Setting up knex and Objection ORM without any errors
- Wait for MySQL container to start up and be running before executing node container
- Add classes support ([@babel/plugin-transform-classes](https://babeljs.io/docs/en/babel-plugin-transform-classes))
- Add Versioning Support for API's
- add Port 80(http) and Port 443(https) support using nginx

### Source

- [Objection.js](https://vincit.github.io/objection.js/) ORM
- [Knex.js](http://knexjs.org/) Query Builder
- [Node MySQL 2](https://www.npmjs.com/package/mysql2)
- [How to Create MySQL Users Accounts and Grant Privileges](https://linuxize.com/post/how-to-create-mysql-user-accounts-and-grant-privileges/)
- [How to Create MySQL User and Grant Privileges: A Beginner’s Guide](https://www.hostinger.in/tutorials/mysql/how-create-mysql-user-and-grant-permissions-command-line)
- Babel Setup
  - [Configure Babel for a Nodejs Application](https://dev.to/adebayoileri/configure-babel-for-nodejs-application-3798)
  - [A Minimal Node.js, Express, & Babel Setup](https://dev.to/neightjones/a-minimal-node-js-express-babel-setup-27j6)
- Docker Compose
  - [Use Compose in production](https://docs.docker.com/compose/production/)
  - [Share Compose configurations between files and projects](https://docs.docker.com/compose/extends/)
- Knex Objection ORM Tutorial
  - [Node Objection.js tutorial with knex and Postgres | Node SQL ORM](https://youtu.be/zbIl2kuP7tE) (YouTube)
  - [objection-js-tutorial](https://github.com/productioncoder/objection-js-tutorial)
- [Knex Setup Guide](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977)
- knex wait for connection
  - [pool afterCreate](https://github.com/knex/knex/issues/3447#issuecomment-672881144)
  - [acquireConnectionTimeout](http://knexjs.org/#Installation-acquireConnectionTimeout)
  - [Setting up Docker with Knex.js and PostgreSQL](https://stackoverflow.com/questions/48751074/setting-up-docker-with-knex-js-and-postgresql)
  - [Docker wait for postgresql to be running](https://stackoverflow.com/a/61202718/12381908)
  - [Waiting for MySQL to come up before talking to it](https://github.com/docker-library/mysql/issues/547#issuecomment-471093838)
  - [bonita example](https://github.com/docker-library/docs/blob/9660a0cccb87d8db842f33bc0578d769caaf3ba9/bonita/stack.yml#L28-L44)
  - [wait-for-it Usage with Docker #57](https://github.com/vishnubob/wait-for-it/issues/57)
  - [Containerizing a Node.js Application for Development With Docker Compose](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
  - [Troubleshooting Knex Connection](https://medium.com/@isachenx/troubleshooting-knex-connection-d331cea007f2)
- [ECMAScript modules (ESM) Interoperability](http://knexjs.org/#esm-interop)
- [Deleting data from associated tables using knex.js](https://stackoverflow.com/a/53861921/12381908)
- [Better logs for ExpressJS using Winston and Morgan with Typescript](https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n)
- [Express middleware: A complete guide](https://blog.logrocket.com/express-middleware-a-complete-guide/)
- [Express Use gzip compression](https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression)

### Pre-Requisite

- Make the `wait-for.sh` script executable

  ```sh
  chmod +x wait-for.sh
  ```

- Modify Docker Compose `command` in the `node-app` service

  ```txt
  # ./wait-for.sh <wait-for-service-name>:<port-of-the-service> -- <commands-to-execute-after>

  command: ./wait-for.sh mysql:3306 -- npm run dev
  ```

### Knex Setup

- Init

  ```sh
  knex init --cwd ./src/db
  ```

- Migrations

  ```sh
  knex --esm migrate:make --cwd ./src/db <migrations_name>
  ```

- Seeds

  ```sh
  knex --esm seed:make --cwd ./src/db <seed_name>
  ```

- Login into docker and run `migrate` and `seed`

### DOCKER COMMANDS

- Image

  - List images

    ```sh
    docker image ls
    ```

  - Remove one or more images

    ```sh
    docker image rm <image_name>
    ```

- Container

  - List Running

    ```sh
    docker ps
    ```

  - List All

    ```sh
    docker ps -a
    ```

  - Remove one or more containers

    ```sh
    docker image rm <image_name>

    # force
    docker image rm <image_name> -f

    # volumes
    docker image rm <image_name> -v

    # force and volume
    docker image rm <image_name> -fv
    ```

    **NOTE**:
      1. `-f` or `--force`: Force the removal of a running container (uses SIGKILL)
      2. `-v` or `--volumes`: Remove anonymous volumes associated with the container

- Volumes

  - List volumes

    ```sh
    docker volume ls
    ```

  - Remove all unused local volumes

    ```sh
    docker volume prune
    ```

- Access File System

  - use `sh` or `ash` since `bash` is unavailable in alpine images

    ```sh
    docker exec -it <container_name> ash

    # as root user
    docker exec -it --user root <container_name> ash
    ```

    **NOTE**:
      1. Run a command in a running container
      2. `-i` or `--interactive`: Keep STDIN open even if not attached
      3. `-t` or `--tty`: Allocate a pseudo-TTY

  - check the set environment variables inside the docker container

    ```sh
    printenv
    ```

- Compose

  - DEVELOPMENT

    - up

      ```sh
      docker-compose up -d

      # use this if there is any changes in Dockerfile to Build images before starting containers
      docker-compose up -d --build

      # re-build image without downing the container and re creating anonymous volumes
      docker-compose up -d --build -V
      ```

      **NOTE**: `-d` or `--detach`: Detached mode: Run containers in the background

    - down

      ```sh
      docker-compose down

      # Remove containers and it's volumes (don't use it if you want db to persist)
      docker-compose down -v

      # Remove all images used by any service
      docker-compose down --rmi all

      # Remove only images that don't have a custom tag set by the `image` field
      docker-compose down --rmi local
      ```

      **NOTE**: `-v` or `--volumes`: Remove named volumes declared in the `volumes` section of the Compose file and anonymous volumes attached to containers

  - PRODUCTION

    - up

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

      # rebuild images
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
      ```

    - down

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
      
      # don't remove volumes
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
      ```

  **NOTE**: can also use `docker compose` instead of `docker-compose`

- Database

  - MySQL
  
    - Open MySQL (recommended)

      ```sh
      docker exec -it <db_container_name> bash

      mysql -u <user_name> -p
      # enter your password

      use <db_name>
      ```

    - directly login into mysql

      ```sh
      # open mysql
      docker exec -it <db_container_name> mysql -u <user_name> --password=<password>

      # directly open the database
      docker exec -it <db_container_name> mysql -u <user_name> --password=<password> <db_name>
      ```

  - redis

    - open redis

      ```sh
      docker exec -it <redis_container_name> redis-cli
      ```

    - View Session keys inside redis-cli

      ```txt
      KEYS *
      ```

    - Get Session Details by using the session id got from `KEYS *`

      ```txt
      GET <session_key>
      ```

- Cleaning

  If you want a fresh start for everything, run `docker system prune -a` and `docker volume prune`. The first command removes any unused containers and the second removes any unused volumes. I recommend doing this fairly often since Docker likes to stash everything away causing the gigabytes to add up.
