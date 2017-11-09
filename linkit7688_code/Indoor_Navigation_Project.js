var com = require("serialport");
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '140.122.105.184',
    user: 'user',
    password: '0000',
    database: 'preliminary_beacon_db',
    port: 3306
});

conn.connect();


var serialPort = new com.SerialPort("/dev/ttyS0", {
    baudrate: 57600,
    parser: com.parsers.readline('\r\n')
});
var count = 0;
serialPort.on('open',function() {
    console.log('SerialPort open...');
    var intervalTime = 30000;
    setInterval(function () {
        var cmd = "A";
        serialPort.write(cmd, function (err) {
            if (err) {
                return console.log('Error on write:', err.message);
            }
            console.log("Sending message: " + cmd + "  ," + count);
        });
        count++;
    }, intervalTime);
});

serialPort.on('data', function(data) {
    console.log('data...');
    var jobj = JSON.parse(data);

    //console.log("JSON[FID]=",jobj.FID);
    //console.log("JSON[UUID]=",jobj.UUID);
    //console.log("JSON[Major]=",jobj.Major);
    console.log("JSON[Minor]=", jobj.Minor);
    //console.log("JSON[MAC]=",jobj.MAC);
    console.log("JSON[RSS]", jobj.RSS);

    var data = {
        Position: '04',
        BeaconMinor: jobj.Minor,
        RSS: jobj.RSS
    };

    conn.query('INSERT INTO `room 1` SET ?', data, function (error) {
        if (error) {
            console.log('insert data err');
            throw error;
        }
    });
});       
                                                