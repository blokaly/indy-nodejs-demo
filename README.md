# indy-nodejs-demo
Run Hyperledger Indy nodejs demo with dockers

### 1. Prerequisite

- docker
- docker-compose (optional)

### 2.1 Pull docker images

Docker images can be pulled directly from docker hub:

```bash
$ docker pull blokaly/xpindy-node1
$ docker pull blokaly/xpindy-node2
$ docker pull blokaly/indy-nodejs-demo
```

### 2.2 Load docker images locally

Skip this section if the docker images already been pulled from the docker hub.

If the docker images were obtained and present on the local file system, then execute:

```bash
$ docker load -i indy-node1.tar
$ docker load -i indy-node2.tar
$ docker load -i indy-nodejs-demo.tar
```

### 3.1 With docker-compose installed

Under the indy-nodejs-demo folder, execute:

`$ docker-compose up -d`

then you should see the following output:

```bash
Creating network "indy-demo-network" with driver "bridge"
Creating indy-node1       ... done
Creating indy-nodejs-demo ... done
Creating indy-node2       ... done
```

And we can attach to the running container of indy-nodejs-demo:

`$ docker attach indy-nodejs-demo`

### 3.2 Without docker-compose

If you don't have the docker-compose command installed, then execute the following commands:

```bash
$ docker network create --driver=bridge --subnet=172.18.0.0/16 indy-demo-network
$ docker run -dit --name indy-node1 --network indy-demo-network --ip 172.18.0.2 --publish 9702:9702 blokaly/xpindy-node1
$ docker run -dit --name indy-node2 --network indy-demo-network --ip 172.18.0.3 --publish 9704:9704 blokaly/xpindy-node2
$ docker run -it --name indy-nodejs-demo --network indy-demo-network --ip 172.18.0.4 blokaly/indy-nodejs-demo bash
```

### 4. Run the demo within _indy-nodejs-demo_ docker container

After attached to the indy-nodejs-demo container in 3.1 or started interactively in 3.2, within the container:

```bash
> su - indy
$ cd indy-nodejs-demo
$ npm run main
```

then you should see the following outputs:

```
> indy-nodejs-demo@1.0.0 main /home/indy/indy-nodejs-demo
> node ./src/main.js

Anoncreds Revocation scenario sample -> started
Set protocol version 2 to work with Indy Node 1.4
Actors Open connections to ledger
Actors Create Wallets
Actors Create DIDs
......
......
Actors close and delete wallets
Actors close and delete poolHandles
Anoncreds Revocation sample -> completed
```

### 5. Notes

- If problem occurred running `npm run main`, you can run the **clear.sh** script to delete the caches and re-call it again
- After demo run completed, you can type `exit` twice to quit the container
- Finally, you can run `docker-compose down` to clear down the dockers or manually remove them using docker command
- Source files are copied and adapted from the original Indy SDK repo: https://github.com/hyperledger/indy-sdk/tree/master/samples/nodejs/src
