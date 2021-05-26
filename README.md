# Objection ORM using Knex on MySql

## Source

- [Objection.js](https://vincit.github.io/objection.js/) ORM
- [Knex.js](http://knexjs.org/) Query Builder
- [Node MySQL 2](https://www.npmjs.com/package/mysql2)
- [How to Create MySQL Users Accounts and Grant Privileges](https://linuxize.com/post/how-to-create-mysql-user-accounts-and-grant-privileges/)
- [How to Create MySQL User and Grant Privileges: A Beginner’s Guide](https://www.hostinger.in/tutorials/mysql/how-create-mysql-user-and-grant-permissions-command-line)

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

  - Access File System

    - use `sh` or `ash` since `bash` is unavailable in alpine images

      ```sh
      docker exec -it knex-objection-node-app ash
      ```

    - as root user

      ```sh
      docker exec -it --user root knex-objection-node-app ash
      ```
