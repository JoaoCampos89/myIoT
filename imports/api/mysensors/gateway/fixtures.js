var gatewayFixture = {
    "_id" : "v9TectX9MnvMaSKpg",
    "id" : "ipsc",
    "nodes" : [
        {
            "id" : 0,
            "protocol" : "2.0.0",
            "sensor" : [
                {
                    "id" : 255,
                    "type" : 18
                }
            ],
            "heartbeat" : "112141",
            "operational": true,
            "batteryLevel": 10,
            "targetGroupId" : "WzFGmBsgt2MhfuNo3"
        },
        {
            "id" : 1,
            "protocol" : "2.0.0",
            "sensor" : [
                {
                    "id" : 255,
                    "type" : 18
                },
                {
                    "id" : 16,
                    "type" : 23
                },
                {
                    "id" : 2,
                    "type" : 3
                },
                {
                    "id" : 3,
                    "type" : 3
                },
                {
                    "id" : 4,
                    "type" : 3
                },
                {
                    "id" : 5,
                    "type" : 3
                }
            ],
            "sketchName" : "Target1",
            "sketchVersion" : "1.0",
            "heartbeat" : "1019998",
            "operational": true,
            "batteryLevel": 30,
            "targetGroupId" : "WzFGmBsgt2MhfuNo3"
        }
    ],
    "totalNodes" : 2,
    "ready" : true
};




export default function generateFixtures(){
  this.update({id:"ipsc"},
    {$set:gatewayFixture}
    );

}
