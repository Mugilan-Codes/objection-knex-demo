# Objection ORM using Knex on MySql

## Practice setup for objection knex with docker

### TODO

- Remove babel and use `.mjs` file extension instead of `.js`
- Complete Setting up knex and Objection ORM without any errors
- Wait for MySQL container to start up and be running before executing node container
- Add classes support ([@babel/plugin-transform-classes](https://babeljs.io/docs/en/babel-plugin-transform-classes))
- Add Versioning Support for API's
- add Port 80(http) and Port 443(https) support using nginx
- REVIEW: do wee need wait-for.sh in production?

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
- [AWS EC2 setup](https://youtu.be/rE8mJ1OYjmM) (YouTube)
- [How to fix docker: Got permission denied while trying to connect to the Docker daemon socket](https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket)
- [Amazon Linux 2 - install docker & docker-compose](https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)

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

- **IMPORTANT**: Login into docker and run `migrate` and `seed`

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

      # scale the number of instances
      docker-compose up -d --scale node-app=2
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

### Production

1. Launch an server on cloud (use digital ocean or aws). I am using AWS.
  
   - Add ubuntu in AWS EC2 instance (i chose `t2.small`).

   - Select Free Tier

   - Add security group for HTTP(80) and HTTPS(443) and SSH(22)
  
   - click `Review and Launch`

   - Add Tags if you want `Key=Name` and `Value=App`
  
   - Create key file and store it in a secure location for ssh access
  
   - Launch Instance
  
   - Wait for instance status to be running and copy the `Public IP address`.
  
   - Go to the location of the downloaded key file and open the terminal.
  
   - type in the command to get access to the cloud instance of the ubuntu server. (`ubuntu`/`ec2-user` user is created by default)
  
      ```sh
      ssh -i <key-file-name>.<extension> ubuntu@<public_ip>

      # if using AMI instance
      ssh -i <key-file-name>.<extension> ec2-user@<public_ip>
      ```

      **NOTE**: based on the file extension (.pem or .cer) we may need to giv it special permissions using `chmod 600 <key-file-name>.<extension>`. run the above command again to get access to the ubuntu instance

   - Update Ubuntu (Optional)

      ```sh
      # check updates available
      sudo apt list --upgradable

      # Update the repository index and install the updates for Kernel and installed applications
      sudo apt update && sudo apt upgrade -y

      # run this once the update is finished
      sudo reboot
      ```

      **NOTE**: After rebooting wait for sometime and connect into the ubuntu instance using ssh

1. [Add Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys) to get repository access inside the server (work even for private repository)

   - Generate SSH key inside server

      ```sh
      cd .ssh/

      ssh-keygen -t ed25519 -C "your_email@example.com"
      ```

   - Copy public key from `id_*.pub` and paste it into deploy keys section of the github repo.

1. Install Docker in the Ubuntu Instance

    - get [docker](https://get.docker.com/) engine community from the scripts

      ```sh
      curl -fsSL https://get.docker.com -o get-docker.sh

      sh get-docker.sh
      ```

    - Install docker, git (when using `AMI instance`)

      ```sh
      sudo yum install -y docker git

      sudo service docker start
      sudo usermod -a -G docker ec2-user

      # Make docker auto-start
      sudo chkconfig docker on

      # Reboot to verify it all loads fine on its own.
      sudo reboot
      ```

    - get [docker-compose](https://docs.docker.com/compose/install/) from official documentation for linux

      ```sh
      # check the docs for version before using this command
      sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

      # get latest version
      sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

      sudo chmod +x /usr/local/bin/docker-compose
      ```

    - [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) or [Run the Docker daemon as a non-root user (Rootless mode)](https://docs.docker.com/engine/security/rootless/)

1. Create `.env` file inside server

   - Open a .env file using vim  

      ```sh
      vim .env
      ```

   - Add environmental variables

      ```vim
      NODE_ENV=production
      MYSQL_ROOT_PASSWORD=
      MYSQL_DATABASE=
      MYSQL_USER=
      MYSQL_PASSWORD=
      SESSION_SECRET=
      ```

      **NOTE**: `NODE_ENV=production` is not needed since it is set with dockerfile, but adding it even though

   - Modify `.profile` to load `.env`

      ```sh
      vim .profile
      ```

      ```vim
      # Add this at the bottom
      
      set -o allexport; source $HOME/.env; set +o allexport 
      ```

      **NOTE**: use `$HOME` (or) `$(pwd)` (or) `$PWD` (or) absolute path

   - check existing environmental variables

      ```sh
      printenv
      ```

   - Exit and relogin again for the changes to take effect

1. Create a folder for the code and clone it (ssh)

    ```sh
    mkdir app

    cd app

    git clone git@github.com:Mugilan-Codes/objection-knex-demo.git .
    ```

1. Run docker production command

    ```sh
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    ```

    - Run migrations inside the node-app container

      ```sh
      docker exec -it app_node-app_1 ash

      npm run migrate:prod
      ```

    - Check in mysql container if the migrations where successfull

      ```sh
      docker exec -it app_mysql_1 mysql -u <MYSQL_USER> --password=<MYSQL_PASSWORD>
      ```

      ```sql
      select database();

      show databases;

      use <MYSQL_DATABASE>;

      select database();

      show tables;

      desc <table_name>;
      ```

1. Make calls to the API from anywhere in the world

     ```http
     http://<PUBLIC_IPV4_ADDRESS/PUBLIC_IPV4_DNS>/api/v1
     ```

1. Workflow

   - Make changes to src and push it to github

   - `cd app` in production server and git pull the new changes

   - Build the new image in production server

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

      # we know that there will be changes only in the node app so we can do this instead 
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build node-app

      # do the above thing but without rebuilding the dependencies (depends_on)
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app

      # force rebuild containers even when there is no change without dependecies
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app
      ```

   - Use a cloud repo to store the built images (**_DockerHub_** or amazon's ECR or something else..). Create a repository there.

     - Tag the image with respect to the name on the remote image repo that was created. (`<username>/<repo_name>`)

        ```sh
        docker image tag <local_image_name>:<version> <username>/<repo_name>
        
        docker image tag objection-knex_node-app mugilancodes/objection-knex-node-app
        ```

        **NOTE**: if `version` is not provided it defaults to `latest`

     - Push the tagged image to remote repo

        ```sh
        docker push <username>/<repo_name>

        docker push mugilancodes/objection-knex-node-app
        ```

     - Update docker-compose.yml file to use this `image`
 using `git push`

      **NOTE**: Do these in the local development machine

   - Pull in the changes using `git pull` and run the containers again in `production server` to tag the images

      ```sh
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
      ```

   - How to make changes reflect in production server?

     1. In Develoment Machine

        - Build the custom images in local development machine

          ```sh
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

          # only specific service
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app
          ```

        - Push the built images to cloud image repo

          ```sh
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml push

          # only specific service
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app
          ```

     1. In Production Server

        - Pull the changes from cloud repo into the production server

          ```sh
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

          # only specific image
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull node-app
          ```

        - Update the changes

          ```sh
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

          # specific rebuild
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-app
          ```

        **NOTE**: use [watchtower](https://containrrr.dev/watchtower/) to automate these steps in production server

1. Orchestrator (kubernetes or [**_docker swarm_**](https://docs.docker.com/engine/swarm/))

   - Check if docker swarm is active in production server (`Swarm: active`)

     ```sh
     docker info
     ```

   - Activate Swarm

     - Get public ip (`eth0 --> inet`)

       ```sh
       ip add
       ```

     - Initialize swarm using the public ip

       ```sh
       docker swarm init --advertise-addr <public_ip>
       ```

   - Add Nodes to Swarm

     - Manager

       ```sh
       docker swarm join-token manager
       ```

     - Worker

       ```sh
       docker swarm join --token <token_provided> <ip>:<port>
       
       # retrieve the join command for the worker
       docker swarm join-token worker
       ```

   - Update compose file for [swarm deployment](https://docs.docker.com/compose/compose-file/compose-file-v3/#deploy) and push it to github

   - Pull in the changes made to production docker compose into production server. Tear down the running containers to prepare for docker stack deploy

   - Deploy (you can choose any name for the Stack instead of `myapp`)

      ```sh
      docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml myapp
      ```

      - check how many nodes are running

         ```sh
         docker node ls
         ```

      - check how many stacks are there

         ```sh
         docker stack ls
         ```

      - list the services in the stack

         ```sh
         docker stack services myapp
         ```

      - list all the services across all stacks

         ```sh
         docker service ls
         ```

      - list the tasks in the stack
  
         ```sh
         docker stack ps myapp
         ```
