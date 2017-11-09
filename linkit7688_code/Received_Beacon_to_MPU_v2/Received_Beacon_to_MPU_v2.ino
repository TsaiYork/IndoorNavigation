#include <SoftwareSerial.h>
#include <ArduinoJson.h>
//10<-->tx,9<-->rx
SoftwareSerial Beacon(10,9);


String ATCommand,Responce;
char cmd;
String FID, UUID, Major, Minor, MAC, RSS;

StaticJsonBuffer<200> jsonBuffer;
JsonObject& Jsonroot = jsonBuffer.createObject();

void setup() {
  // put your setup code here, to run once:
    Serial.begin(115200);
    Serial.setTimeout(50);
    Serial1.begin(57600);
    Serial1.setTimeout(50);
    Beacon.begin(9600);
    Beacon.setTimeout(10000);

    delay(1000);
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
            Serial.print("AATCommand: ");
            Serial.println(ATCommand);
            //Responce = "aa";
            //Responce = "aaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJjjjjjjjjjjjjKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMMMMMNNNNNNNNNNOOOOOOOOOOOOOOOOOOPPPPQQQQQ";
            //Serial.flush();
            //Responce = "OK+DISISOK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990001D0:98072D07B615:-081OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:0199000CD0:98072D07BA86:-080OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:0199000AD0:98072D07B53D:-066OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:0199000EC2:A0E6F893D4A7:-070OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990009D0:98072D07B7CF:-078OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990006D0:98072D07B686:-081OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990007D0:98072D07B609:-068OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990003D0:98072D07B550:-078OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990008D0:98072D07BAA5:-040OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990002D0:98072D07B752:-078OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:0199000BD0:98072D07B909:-040OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990005D0:98072D07B625:-040OK+DISC:4C000215:C36F33148FE84FDC9E28589DC1A219C5:01990004D0:98072D07BA28:-080OK+DISCE";
            //Serial.println(Responce);
            Beacon.print(ATCommand);
            }
        }
  
    while(Beacon.available()){
        
        Responce = Beacon.readStringUntil('O');
        Serial.println(Responce);
        Serial1.println(Responce);
        }      
}
