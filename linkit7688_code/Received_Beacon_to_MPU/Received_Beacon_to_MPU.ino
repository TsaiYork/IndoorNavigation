#include <SoftwareSerial.h>
#include <ArduinoJson.h>
//10<-->tx,9<-->rx
SoftwareSerial Beacon(10,9);

void AnalysisString(String Res);

String ATCommand,Responce;
char cmd;
String FID, UUID, Major, Minor, MAC, RSS;

StaticJsonBuffer<200> jsonBuffer;
JsonObject& Jsonroot = jsonBuffer.createObject();

void setup() {
  // put your setup code here, to run once:
    Serial.begin(115200);
    Serial.setTimeout(100);
    Serial1.begin(57600);
    Serial1.setTimeout(100);
    Beacon.begin(9600);
    Beacon.setTimeout(5000);

    delay(3000);
    Serial.println("Start");
}

void loop() {
  // put your main code here, to run repeatedly:
    while(Serial1.available()){
        cmd = Serial1.read();
        if(cmd == 'A'){
            ATCommand = "AT+DISI?";
            Serial.print("ATCommand: ");
            Serial.println(ATCommand);
            Beacon.print(ATCommand);
            }
        }
    while(!Serial1.available() && Serial.available()){
        cmd = Serial.read();
        if(cmd == 'A'){
            ATCommand = "AT+DISI?";
            Serial.print("ATCommand: ");
            Serial.println(ATCommand);
            Beacon.print(ATCommand);
            }
        }
  
    while(Beacon.available()){
        Responce = Beacon.readString();
        //Serial.print("Responce:");
        //Serial.println(Responce);
        //Serial.flush();
        
        //AnalysisString(Responce);
        Serial1.print(Responce);
        //Serial1.flush();
        }      
}

void AnalysisString(String Res){
    int pos=0;
    int DataPtr[7]={0,0,0,0,0,0,0};
    int count=0;
    Res.remove(0,8);                                    //  remove "OK+DISCS"
    while(Res.indexOf("OK+DISC:",DataPtr[count])!=-1){
        DataPtr[count] = Res.indexOf("OK+DISC:",DataPtr[count]);
        DataPtr[count+1] = DataPtr[count]+8;
//        pos = Res.indexOf("OK+DISC:",pos);
//        pos += 8;
        count += 1;
        }
    Serial.print("count=");Serial.println(count);
    for(int i=0; i<count ; i++){
        Res.remove(0,8);                                    //  remove "OK+DISCS"
        FID = Res.substring(0,8);
        Res.remove(0,9);                                    //  remove "FID:"
        UUID = Res.substring(0,32);
        Res.remove(0,33);
        Major = Res.substring(0,4);
        Minor = Res.substring(4,8);
        Res.remove(0,11);
        MAC = Res.substring(0,12);
        Res.remove(0,13);
        RSS = Res.substring(0,4);
        Res.remove(0,4);
        Serial.println(MAC);
        Jsonroot["FID"] = FID;
        Jsonroot["UUID"] = UUID;
        Jsonroot["Major"] = Major;
        Jsonroot["Minor"] = Minor.toInt();
        Jsonroot["MAC"] = (String)MAC;
        Jsonroot["RSS"] = RSS.toInt();


        Jsonroot.printTo(Serial1);
        Serial1.print("\r\n");
        Jsonroot.prettyPrintTo(Serial);
        Jsonroot["FID"] = "";
        Jsonroot["UUID"] = "";
        Jsonroot["Major"] = "";
        Jsonroot["Minor"] = "";
        Jsonroot["MAC"] = "";
        Serial1.flush();
        Serial.print("FID=");Serial.println(FID);
        Serial.print("UUID=");Serial.println(UUID);
        Serial.print("Major=");Serial.println(Major);
        Serial.print("Minor=");Serial.println(Minor);
        Serial.print("MAC=");Serial.println(MAC);
        Serial.print("RSS=");Serial.println(RSS);
        }
    //Serial.println(Res);
    //Serial.println(Res.substring(0,1));
//    if(Res.substring(pos+)==':' && Res.substring(pos+9)==':'){
//        FID = Res()
//        }
    }
