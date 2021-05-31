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
- Docker Compose
  - [Use Compose in production](https://docs.docker.com/compose/production/)
  - [Share Compose configurations between files and projects](https://docs.docker.com/compose/extends/)

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

- Cleaning

  If you want a fresh start for everything, run `docker system prune -a` and `docker volume prune`. The first command removes any unused containers and the second removes any unused volumes. I recommend doing this fairly often since Docker likes to stash everything away causing the gigabytes to add up.
