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
    ```

  - as root user

    ```sh
    docker exec -it --user root <container_name> ash
    ```

  - check the set environment variables inside the docker container

    ```sh
    printenv
    ```

  **NOTE**:
    1. Run a command in a running container
    2. `-i` or `--interactive`: Keep STDIN open even if not attached
    3. `-t` or `--tty`: Allocate a pseudo-TTY

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
    2. `-d` or `--detach`: Detached mode: Run containers in the background
    3. `-v` or `--volumes`: Remove named volumes declared in the `volumes` section of the Compose file and anonymous volumes attached to containers
