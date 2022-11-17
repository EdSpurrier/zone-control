const { TitanCore } = require('titan-core');
const { GetWindow } = require('./utils/get-window');

var titanCore = new TitanCore();
var console = titanCore.console;
console.logError(titanCore.hello);

//GetWindow();
require('./utils/udp');