const { TitanCore } = require('titan-core');
const { GetWindow } = require('./utils/get-window');

// MODULES
const udpServer = require('./utils/udp-server')
const udpClient = require('./utils/udp-client')

var titanCore = new TitanCore();
var console = titanCore.console;
console.logError(titanCore.hello);


console.log("Consider creating TitanTunnel");
console.log("TitanTunnel => set to and from ports on one app and then to and from on the other. make 2 apps talk to each other...");
console.log("Or just finish TitanListeners and TitanEmitter/TitanAction...");


//  UDP SERVER
udpServer.setup(titanCore, 4004);

// emits on new datagram msg
udpServer.server.on('message',function(msg,info){
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
    udpServer.close();
});


udpServer.start();

//  UDP CLIENT
udpClient.setup(titanCore);







udpClient.send("Hello", 4004);



setInterval(function(){
    console.log(".");
}, 1000);


