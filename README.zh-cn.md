# Indy NodeJS演示
基于NodeJS演示如何运行超级账本Indy

### 1. 预先安装

- docker
- docker-compose (非必须)

### 2.1 下载Docker镜像

可以直接从Docker Hub下载所需镜像:

```bash
$ docker pull blokaly/xpindy-node1
$ docker pull blokaly/xpindy-node2
$ docker pull blokaly/indy-nodejs-demo
```

### 2.2 或从本地加载镜像

如果已从Docker Hub下载了镜像，请跳过此部分

如果镜像存储在本地系统，执行以下命令:

```bash
$ docker load -i indy-node1.tar
$ docker load -i indy-node2.tar
$ docker load -i indy-nodejs-demo.tar
```

### 3.1 使用docker-compose安装运行

在indy-nodejs-demo目录下，运行命令:

`$ docker-compose up -d`

那么你应该看到以下输出:

```bash
Creating network "indy-demo-network" with driver "bridge"
Creating indy-node1       ... done
Creating indy-nodejs-demo ... done
Creating indy-node2       ... done
```

然后我们可以进入到indy-nodejs-demo的运行容器中:

`$ docker attach indy-nodejs-demo`

### 3.2 无docker-compose安装运行

如果没有安装docker-compose，可以运行以下docker命令:

```bash
$ docker network create --driver=bridge --subnet=172.18.0.0/16 indy-demo-network
$ docker run -dit --name indy-node1 --network indy-demo-network --ip 172.18.0.2 --publish 9702:9702 blokaly/xpindy-node1
$ docker run -dit --name indy-node2 --network indy-demo-network --ip 172.18.0.3 --publish 9704:9704 blokaly/xpindy-node2
$ docker run -it --name indy-nodejs-demo --network indy-demo-network --ip 172.18.0.4 blokaly/indy-nodejs-demo bash
```

### 4. 在 _indy-nodejs-demo_ docker容器中运行演示

经过步骤3.1或3.2后，在indy-nodejs-demo容器中，我们运行以下命令:

```bash
> su - indy
$ cd indy-nodejs-demo
$ npm run main
```

那么你应该看到以下输出:

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

恭喜你！你已经成功地运行了这个NodeJS演示

### 5. 提示

- 如果运行`npm run main`时出现问题，可以运行**clear.sh**脚本来删除缓存并再次重新调用它
- 演示运行完成后，可以键入`exit`两次以退出容器
- 最后，可以运行`docker-compose down`来清除docker容器或使用docker命令手动删除它们
- 源文件是从原始的Indy SDK仓库复制和改编的:<br/> 
    https://github.com/hyperledger/indy-sdk/tree/master/samples/nodejs/src
