import {
  saveProtocol,
  saveSensor,
  saveBatteryLevel,
  sendTime,
  sendNextAvailableSensorId,
  sendConfig,
  saveSketchName,
  saveSketchVersion,
  saveGatewayReady,
  saveHeartbeatResponse,
  checkRebootRequest
} from './functions.js';

// This function depends of the application, monkey-patch this function with your implementation
import saveValue from './saveValue.js'



import protocol from '../protocol.js';

export default function rfReceived(data, db, gw) {
	if ((data != null) && (data != "")) {
		//console.log("rf-received " +data.toString()+ "length:" + data.length);
		// decoding message
		var datas = data.toString().split(";");
		var sender = +datas[0];
		var sensor = +datas[1];
		var command = +datas[2];
		var ack = +datas[3];
		var type = +datas[4];
    var rawpayload="";
    if (datas[5]) {
          rawpayload = datas[5].trim();
		}
		var payload = rawpayload;

  //  console.log("command:" + command);

		// decision on appropriate response
		switch (command) {
		case protocol['C_PRESENTATION'].value:
			if (sensor == protocol['NODE_SENSOR_ID'])
				saveProtocol(sender, payload, db);
			saveSensor(sender, sensor, type, db);
			break;
		case protocol['C_SET'].value:
			saveValue(sender, sensor, type, payload, db);
			break;
		case protocol['C_REQ'].value:
			break;
		case protocol['C_INTERNAL'].value:
			switch (type) {
			case protocol['C_INTERNAL']['subType'].I_BATTERY_LEVEL:
				saveBatteryLevel(sender, payload, db);
				break;
			case protocol['C_INTERNAL']['subType'].I_TIME:
				sendTime(sender, sensor, gw);
				break;
			case protocol['C_INTERNAL']['subType'].I_VERSION:
				break;
			case protocol['C_INTERNAL']['subType'].I_ID_REQUEST:
				sendNextAvailableSensorId(db, gw);
				break;
			case protocol['C_INTERNAL']['subType'].I_ID_RESPONSE:
				break;
			case protocol['C_INTERNAL']['subType'].I_INCLUSION_MODE:
				break;
			case protocol['C_INTERNAL']['subType'].I_CONFIG:
				sendConfig(sender, gw);
				break;
			case protocol['C_INTERNAL']['subType'].I_PING:
				break;
			case protocol['C_INTERNAL']['subType'].I_PING_ACK:
				break;
			case protocol['C_INTERNAL']['subType'].I_LOG_MESSAGE:
				break;
			case protocol['C_INTERNAL']['subType'].I_CHILDREN:
				break;
			case protocol['C_INTERNAL']['subType'].I_SKETCH_NAME:
				saveSketchName(sender, payload, db);
				break;
			case protocol['C_INTERNAL']['subType'].I_SKETCH_VERSION:
				saveSketchVersion(sender, payload, db);
				break;
			case protocol['C_INTERNAL']['subType'].I_REBOOT:
				break;
      case protocol['C_INTERNAL']['subType'].I_GATEWAY_READY:
        saveGatewayReady(sender,payload);
        break;
      case protocol['C_INTERNAL']['subType'].I_HEARTBEAT_RESPONSE:
        saveHeartbeatResponse(sender,payload);
        break;
      }
			break;
		}
		checkRebootRequest(sender, db, gw);
	}
}
