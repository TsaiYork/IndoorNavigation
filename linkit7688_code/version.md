## 最初版程式 Indoor_Navigation_Project.js ##
* 搭配Arduino Code **Received_Beacon_to_MPU**
* 功能: MCU先將資料在ATmega晶片做第一次分析，分析完後傳JSON檔到MPU，MPU負責解碼，上傳資料庫
* 最後修改時間: 2017/9/22

## 改版程式 Indoor_Navigation_Project_v1.js ##
* 搭配Arduino Code **Received_Beacon_to_MPU_v1**
* 功能: MCU只負責MPU與HM-10之間溝通，字串來自HM-10到ATMega後不做任何處理直接送到MPU MPU負責做解碼、上傳資料庫，若收不到Beacon值，則給RSS = 999代表收不到beacon訊號
* 最後修改時間: 2017/9/29