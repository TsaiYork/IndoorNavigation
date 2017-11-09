const RECEIVER_QUANTITY = 6;
const INTERVAL_TIME = 30000;
const RECEIVER_ID = '01';

var com = require("serialport");
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '140.122.105.184',
    user: 'user',
    password: '0000',
    database: 'preliminary_beacon_db',
    port: 3306
});

var serialPort = new com.SerialPort("/dev/ttyS0", {
    baudrate: 57600,
    parser: com.parsers.readline('\r\n')
});

conn.connect();


var receiverArr = new Array();



serialPort.on('open',function() {
    console.log('SerialPort open...');
    var count = 0;
    setInterval(function () {
        var cmd = "A";
        serialPort.write(cmd, function (err) {
            if (err) 
                return console.log('Error on write:', err.message);
            console.log("Sending message: " + cmd + "  ," + count);
        });
        count++;
    }, INTERVAL_TIME);
});

serialPort.on('data', function (data) {
    console.log(''); console.log(data); console.log('');

    for (var i = 1; i <= RECEIVER_QUANTITY; i++)
        receiverArr[i] = 999;

    receiverArr = ParseBeaconData(data);

    for (var i = 1; i <= RECEIVER_QUANTITY; i++) {
        var data = {
            Position: RECEIVER_ID,
            BeaconMinor: i,
            RSS: receiverArr[i]
        };

        conn.query('INSERT INTO `room 1` SET ?', data, function (error) {
            if (error) {
                console.log('insert data err');
                throw error;
            }
        });
    }
}); 


var ParseBeaconData = function (msg) {
    var beaconArr = new Array();
    var dataReturn = new Array();
    for (var i = 1; i <= RECEIVER_QUANTITY; i++)
        dataReturn[i] = 999;
    var msgSplit = msg.split('OK+DISC');
    for (var i = 1; i < msgSplit.length - 1; i++) {
        console.log(msgSplit[i]);
        beaconInfo = msgSplit[i].split(':');
        beaconArr[i] = { Major: parseInt(beaconInfo[3].substring(4, 8)), RSS: beaconInfo[5] };

        if (beaconArr[i].Major >= 1 && beaconArr[i].Major <= RECEIVER_QUANTITY) {
            if (beaconArr[i].RSS < 0 && beaconArr[i].RSS >= -120) {
                dataReturn[beaconArr[i].Major] = beaconArr[i].RSS;
                console.log(beaconArr[i].Major + "   " + beaconArr[i].RSS);
            }
        }    
    }
    return dataReturn;
}

/*
//Testing Code
var receiverArr = new Array();
var msg = 'OK+DISISOK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0003C2:A0E6F893D4A7:-119OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0004D0:A0E6F893CA05:-067OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0005D0:A0E6F893C949:-050OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0006D0:A0E6F893CFAC:-060OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0001C4:A0E6F893D1E1:-072OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0002C7:A0E6F893D39F:-072OK+DISC:00000000:00000000000000000000000000000000:0000000000:000000000000:-000OK+DISCE';
receiverArr = ParseBeaconData(msg);
for (var i = 1; i <= RECEIVER_QUANTITY; i++)
    console.log(i + "   " + receiverArr[i]);
*/




      
                                                