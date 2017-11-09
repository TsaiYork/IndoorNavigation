const RECEIVER_QUANTITY = 15;
const RECEIVE_SAMPLE_TIME = 3;
const INTERVAL_TIME = 30000;
const RECEIVER_ID = '01';

var receive_round = 0;
var data_count = 0;

var com = require("serialport");
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '140.122.105.178',
    user: 'user',
    password: '0000',
    database: 'preliminary_beacon_db',
    port: 3306
});

var serialPort = new com.SerialPort("/dev/ttyS0", {
    baudrate: 57600,
    parser: com.parsers.readline('\r\n')
});

//conn.connect();


serialPort.on('open',function() {
    console.log('SerialPort open...');
    var count = 0;
    // setInterval(function () {
        var cmd = "A";
        serialPort.write(cmd, function (err) {
            if (err) 
                return console.log('Error on write:', err.message);
            console.log("Sending message: " + cmd + "  ," + count);
        });
    //     count++;
    // }, INTERVAL_TIME);
});


serialPort.on('data', function (data) {
    console.log(''); console.log(data);
    

    if(data.indexOf('DISIS')>0){
        data_count = 0
        console.log('Read Start');
    }else if(data.indexOf('DISC:')>0 && data.length==77){ 
        var dataReceive = ParseBeaconData(data);
        if(dataReceive!=null){
            data_count ++; 
            console.log(dataReceive);
        }
    }else if(data.indexOf('DISCE')>0){
        receive_round ++;
        console.log('Round:'+receive_round+',  data count:'+ data_count);
    }

    if (receive_round == 0){
        //寫新的Array
    }else if(receive_round >= RECEIVE_SAMPLE_TIME){
        receive_round = 0;
        //上傳資料庫
    }else{
        //更新array
    }


    // for (var i = 1; i <= RECEIVER_QUANTITY; i++) {
    //     var data = {
    //         Position: RECEIVER_ID,
    //         BeaconMinor: i,
    //         RSS: receiverArr[i]
    //     };

        // conn.query('INSERT INTO `room 1` SET ?', data, function (error) {
        //     if (error) {
        //         console.log('insert data err');
        //         throw error;
        //     }
        // });
    // }
}); 

var ReceiveProcess = function(){

}

/*K+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990008D0:98072D07BAA5:-041*/
var ParseBeaconData = function(msg){
    var msgSplit = msg.split('DISC:');
    if(msgSplit[1]!=null){
        console.log(msgSplit[1]);
        var beaconInfo = msgSplit[1].split(':');
        var dataReturn = { Major: parseInt(beaconInfo[2].substring(4, 8),16), RSS: beaconInfo[4] };
    }
    if(dataReturn.Major >= 1 && dataReturn.Major <=20)
    {
        if(dataReturn.RSS < 0 && dataReturn.RSS >=-150)
            return dataReturn;
        else
            return null;
    }
    else
        return null;
}

// var ParseBeaconData = function (msg) {
//     var beaconArr = new Array();
//     var dataReturn = new Array();
//     var msgSplit = msg.split('DISC:');
//     if(msgSplit[1]!=null){
//         console.log(msgSplit[1]);
//         var beaconInfo = msgSplit[1].split(':');
//         for (var i = 0; i < beaconInfo.length; i++){
//             console.log('b['+i+']='+beaconInfo[i]);
//         }
//     }

//     // for (var i = 1; i < msgSplit.length - 1; i++) {
//     //     console.log(msgSplit[i]);
//     //     beaconInfo = msgSplit[i].split(':');
//     //     beaconArr[i] = { Major: parseInt(beaconInfo[3].substring(4, 8)), RSS: beaconInfo[5] };

//     //     if (beaconArr[i].Major >= 1 && beaconArr[i].Major <= RECEIVER_QUANTITY) {
//     //         if (beaconArr[i].RSS < 0 && beaconArr[i].RSS >= -120) {
//     //             dataReturn[beaconArr[i].Major] = beaconArr[i].RSS;
//     //             console.log(beaconArr[i].Major + "   " + beaconArr[i].RSS);
//     //         }
//     //     }    
//     // }
//     return dataReturn;
// }

/*
//Testing Code
var receiverArr = new Array();
var msg = 'OK+DISISOK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0003C2:A0E6F893D4A7:-119OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0004D0:A0E6F893CA05:-067OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0005D0:A0E6F893C949:-050OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0006D0:A0E6F893CFAC:-060OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0001C4:A0E6F893D1E1:-072OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:019A0002C7:A0E6F893D39F:-072OK+DISC:00000000:00000000000000000000000000000000:0000000000:000000000000:-000OK+DISCE';
receiverArr = ParseBeaconData(msg);
for (var i = 1; i <= RECEIVER_QUANTITY; i++)
    console.log(i + "   " + receiverArr[i]);
*/




      
                                                