"use strict";
const mkdirp = require('mkdirp');
const fs = require('fs');
const os = require('os');

async function getPoolGenesisTxnPath(poolName) {
   let path = `${os.tmpdir()}/indy/${poolName}.txn`;
   await savePoolGenesisTxnFile(path);
   return path
};

async function poolGenesisTxnData() {
   return `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"172.18.0.2","client_port":9702,"node_ip":"172.18.0.2","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"172.18.0.3","client_port":9704,"node_ip":"172.18.0.3","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
`;
}

async function savePoolGenesisTxnFile(filePath) {
   let data = await poolGenesisTxnData();
   await mkdir(filePath);
   return fs.writeFileSync(filePath, data, 'utf8');
}

async function mkdir(filePath) {
   return new Promise((resolve, reject) => {
      let folderPath = filePath.split('/').slice(0, filePath.split('/').length - 1).join('/');
      mkdirp(folderPath, function(err, res) {
         if(err) reject(err);
         else resolve(res);
      })
   })
}

function pathToIndyClientHome() {
   return require('os').homedir() + "/.indy_client"
}

function sleep(duration){
   return new Promise(resolve => {
      setTimeout(resolve,duration)
   })
}

function getCurrentTimeInSeconds() {
   return Math.floor(Date.now() / 1000)
}

module.exports = {
   getPoolGenesisTxnPath,
   getPathToIndyClientHome: pathToIndyClientHome,
   sleep,
   getCurrentTimeInSeconds
}
