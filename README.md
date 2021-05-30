# Objection ORM using Knex on MySql

## Source

- [Objection.js](https://vincit.github.io/objection.js/) ORM
- [Knex.js](http://knexjs.org/) Query Builder
- [Node MySQL 2](https://www.npmjs.com/package/mysql2)
- [How to Create MySQL Users Accounts and Grant Privileges](https://linuxize.com/post/how-to-create-mysql-user-accounts-and-grant-privileges/)
- [How to Create MySQL User and Grant Privileges: A Beginner’s Guide](https://www.hostinger.in/tutorials/mysql/how-create-mysql-user-and-grant-permissions-command-line)
- Babel Setup
  - [Configure Babel for a Nodejs Application](https://dev.to/adebayoileri/configure-babel-for-nodejs-application-3798)
  - [A Minimal Node.js, Express, & Babel Setup](https://dev.to/neightjones/a-minimal-node-js-express-babel-setup-27j6)

### DOCKER COMMANDS

- Access File System

  - use `sh` or `ash` since `bash` is unavailable in alpine images

    ```sh
    docker exec -it knex-objection-node-app ash
    ```

  - as root user

    ```sh
    docker exec -it --user root knex-objection-node-app ash
    ```

  - check the set environment variables in the docker container

    ```sh
    printenv
    ```

- Compose

  - up

    ```sh
    docker-compose up -d

    # use this if there is any changes in Dockerfile to Build images before starting containers
    docker-compose up -d --build
    ```

  - down

    ```sh
    docker-compose down

    # Remove containers and it's volumes
    docker-compose down -v

    # Remove all images used by any service
    docker-compose down --rmi all

    # Remove only images that don't have a custom tag set by the `image` field
    docker-compose down --rmi local
    ```

  **NOTE**:
    1. can also use `docker compose` instead of `docker-compose`
    2. -d or --detach: Detached mode: Run containers in the background
    3. -v or --volumes: Remove named volumes declared in the `volumes` section of the Compose file and anonymous volumes attached to containers
