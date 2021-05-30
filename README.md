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

## Install Packages

  ```sh
  npm install express objection knex mysql2
  ```

### DOCKER COMMANDS

- Image

  - Build using Dockerfile (runs the final stage in multi-stage build)

    ```sh
    docker build -t knex-objection-node-app-image .
    ```

  - Delete

    ```sh
    docker image rm knex-objection-node-app-image
    ```

  - Build as Dev

    ```sh
    docker build --target dev -t knex-objection-node-app-image .
    ```

  - Build as Prod

    ```sh
    docker build --target prod -t knex-objection-node-app-image .
    ```

- Container

  - Basic Run in Detached Mode with Port-Forwarding

    ```sh
    docker run -p 3000:3000 -d --name knex-objection-node-app knex-objection-node-app-image
    ```

  - Force stop and delete

    ```sh
    docker rm knex-objection-node-app -f
    ```

  - Forcefully Remove a container with volume

    ```sh
    docker rm knex-objection-node-app -fv
    ```

  - Bind local folder to docker

    ```sh
    docker run -v $(pwd):/app:ro -p 3000:3000 -d --name knex-objection-node-app knex-objection-node-app-image
    ```

    **Note**: $(pwd) is specific to unix system (check for other OS). :ro is added to give docker read-only permission over the local folder.

  - Add node_modules as Anonymous Volume(to prevent overiding of node_modules and deleting it)

    ```sh
    docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name knex-objection-node-app knex-objection-node-app-image
    ```

    **Note**: for anonymous volume for node_modules to work we must have a node_modules folder initially in the local folder (this can be done in 2 ways, doing it by npm install in local machine or running the container without read-only(:ro) permission to the bind mount)

  - Set environment variables

    ```sh
    docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:3000 -d --name knex-objection-node-app knex-objection-node-app-image
    ```

    **NOTE**: you can also environment variables one by one instead of using .env file by adding --env(or -e) flag like `-e PORT=3000`

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
