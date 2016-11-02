/**
 *
 * My sensors protocol definitions
 * please see https://www.mysensors.org/download/serial_api_20
 */


 /**
  *
  * My sensors protocol definitions
  * please see https://www.org/download/serial_api_20
  */



 const C_PRESENTATION				= 0;
 const C_SET							= 1;
 const C_REQ							= 2;
 const C_INTERNAL					= 3;
 const C_STREAM						= 4;


 const protocol = {};

 protocol['C_PRESENTATION'] = {};
 protocol['C_SET'] = {};
 protocol['C_REQ'] = {};
 protocol['C_INTERNAL'] = {};
 protocol['C_STREAM'] = {};

 // array of all commands
 protocol['commands'] = ['C_PRESENTATION','C_SET','C_REQ','C_INTERNAL','C_STREAM'];

 protocol['NODE_SENSOR_ID'] = 255;
 protocol['BROADCAST_ADDRESS'] = 255;
 protocol['FIRMWARE_BLOCK_SIZE'] = 16;


 protocol['C_PRESENTATION']['subType'] = {};
 protocol['C_SET']['subType'] = {};
 protocol['C_REQ']['subType'] = {};
 protocol['C_INTERNAL']['subType'] = {};
 protocol['C_STREAM']['subType'] = {};


 protocol['C_PRESENTATION'].value = C_PRESENTATION;
 protocol['C_SET'].value = C_SET;
 protocol['C_REQ'].value = C_REQ;
 protocol['C_INTERNAL'].value = C_INTERNAL;
 protocol['C_STREAM'].value = C_STREAM;


 protocol['C_SET']['subType'].V_TEMP						= 0;
 protocol['C_SET']['subType'].V_HUM							= 1;
 protocol['C_SET']['subType'].V_LIGHT						= 2;
 protocol['C_SET']['subType'].V_DIMMER						= 3;
 protocol['C_SET']['subType'].V_PRESSURE					= 4;
 protocol['C_SET']['subType'].V_FORECAST					= 5;
 protocol['C_SET']['subType'].V_RAIN						= 6;
 protocol['C_SET']['subType'].V_RAINRATE					= 7;
 protocol['C_SET']['subType'].V_WIND						= 8;
 protocol['C_SET']['subType'].V_GUST						= 9;
 protocol['C_SET']['subType'].V_DIRECTION					= 10;
 protocol['C_SET']['subType'].V_UV							= 11;
 protocol['C_SET']['subType'].V_WEIGHT						= 12;
 protocol['C_SET']['subType'].V_DISTANCE					= 13;
 protocol['C_SET']['subType'].V_IMPEDANCE					= 14;
 protocol['C_SET']['subType'].V_ARMED						= 15;
 protocol['C_SET']['subType'].V_TRIPPED						= 16;
 protocol['C_SET']['subType'].V_WATT						= 17;
 protocol['C_SET']['subType'].V_KWH							= 18;
 protocol['C_SET']['subType'].V_SCENE_ON					= 19;
 protocol['C_SET']['subType'].V_SCENE_OFF					= 20;
 protocol['C_SET']['subType'].V_HEATER						= 21;
 protocol['C_SET']['subType'].V_HEATER_SW					= 22;
 protocol['C_SET']['subType'].V_LIGHT_LEVEL					= 23;
 protocol['C_SET']['subType'].V_VAR1						= 24;
 protocol['C_SET']['subType'].V_VAR2						= 25;
 protocol['C_SET']['subType'].V_VAR3						= 26;
 protocol['C_SET']['subType'].V_VAR4						= 27;
 protocol['C_SET']['subType'].V_VAR5						= 28;
 protocol['C_SET']['subType'].V_UP							= 29;
 protocol['C_SET']['subType'].V_DOWN						= 30;
 protocol['C_SET']['subType'].V_STOP						= 31;
 protocol['C_SET']['subType'].V_IR_SEND						= 32;
 protocol['C_SET']['subType'].V_IR_RECEIVE					= 33;
 protocol['C_SET']['subType'].V_FLOW						= 34;
 protocol['C_SET']['subType'].V_VOLUME						= 35;
 protocol['C_SET']['subType'].V_LOCK_STATUS					= 36;
 protocol['C_SET']['subType'].V_LEVEL					= 37;
 protocol['C_SET']['subType'].V_VOLTAGE					= 38;
 protocol['C_SET']['subType'].V_CURRENT					= 39;
 protocol['C_SET']['subType'].V_RGB					= 40;
 protocol['C_SET']['subType'].V_RGBW					= 41;
 protocol['C_SET']['subType'].V_ID				= 42;
 protocol['C_SET']['subType'].V_UNIT_PREFIX				= 43;
 protocol['C_SET']['subType'].V_HVAC_SETPOINT_COOL			= 44;
 protocol['C_SET']['subType'].V_HVAC_SETPOINT_HEAT			= 45;
 protocol['C_SET']['subType'].V_HVAC_FLOW_MODE	= 46;
 protocol['C_SET']['subType'].V_TEXT = 47;
 protocol['C_SET']['subType'].V_CUSTOM = 48;
 protocol['C_SET']['subType'].V_POSITION = 49;
 protocol['C_SET']['subType'].V_IR_RECORD = 50;
 protocol['C_SET']['subType'].V_PH = 51;
 protocol['C_SET']['subType'].V_ORP = 52;
 protocol['C_SET']['subType'].V_EC = 53;
 protocol['C_SET']['subType'].V_VAR = 54;
 protocol['C_SET']['subType'].V_VA = 55;
 protocol['C_SET']['subType'].V_POWER_FACTOR = 56;


 protocol['C_REQ']['subType'] = protocol['C_SET']['subType'];



 protocol['C_INTERNAL']['subType'].I_BATTERY_LEVEL				= 0;
 protocol['C_INTERNAL']['subType'].I_TIME						= 1;
 protocol['C_INTERNAL']['subType'].I_VERSION						= 2;
 protocol['C_INTERNAL']['subType'].I_ID_REQUEST					= 3;
 protocol['C_INTERNAL']['subType'].I_ID_RESPONSE					= 4;
 protocol['C_INTERNAL']['subType'].I_INCLUSION_MODE				= 5;
 protocol['C_INTERNAL']['subType'].I_CONFIG						= 6;
 protocol['C_INTERNAL']['subType'].I_FIND_PARENT					= 7;
 protocol['C_INTERNAL']['subType'].I_FIND_PARENT_RESPONSE					= 8;
 protocol['C_INTERNAL']['subType'].I_LOG_MESSAGE					= 9;
 protocol['C_INTERNAL']['subType'].I_CHILDREN					= 10;
 protocol['C_INTERNAL']['subType'].I_SKETCH_NAME					= 11;
 protocol['C_INTERNAL']['subType'].I_SKETCH_VERSION				= 12;
 protocol['C_INTERNAL']['subType'].I_REBOOT						= 13;
 protocol['C_INTERNAL']['subType'].I_GATEWAY_READY	= 14;
 protocol['C_INTERNAL']['subType'].I_REQUEST_SIGNING	= 15;
 protocol['C_INTERNAL']['subType'].I_GET_NONCE =	16;
 protocol['C_INTERNAL']['subType'].I_GET_NONCE_RESPONSE = 17;
 protocol['C_INTERNAL']['subType'].I_HEARTBEAT	= 18;
 protocol['C_INTERNAL']['subType'].I_PRESENTATION =	19;
 protocol['C_INTERNAL']['subType'].I_DISCOVER = 20;
 protocol['C_INTERNAL']['subType'].I_DISCOVER_RESPONSE	= 21;
 protocol['C_INTERNAL']['subType'].I_HEARTBEAT_RESPONSE	= 22;
 protocol['C_INTERNAL']['subType'].I_LOCKED	= 23;
 protocol['C_INTERNAL']['subType'].I_PING =	24;
 protocol['C_INTERNAL']['subType'].I_PONG =	25;
 protocol['C_INTERNAL']['subType'].I_REGISTRATION_REQUEST =	26;
 protocol['C_INTERNAL']['subType'].I_REGISTRATION_RESPONSE =	27;
 protocol['C_INTERNAL']['subType'].I_DEBUG	=28;






 protocol['C_PRESENTATION']['subType'].S_DOOR						= 0;
 protocol['C_PRESENTATION']['subType'].S_MOTION						= 1;
 protocol['C_PRESENTATION']['subType'].S_SMOKE						= 2;
 protocol['C_PRESENTATION']['subType'].S_LIGHT						= 3;
 protocol['C_PRESENTATION']['subType'].S_DIMMER						= 4;
 protocol['C_PRESENTATION']['subType'].S_COVER						= 5;
 protocol['C_PRESENTATION']['subType'].S_TEMP						= 6;
 protocol['C_PRESENTATION']['subType'].S_HUM							= 7;
 protocol['C_PRESENTATION']['subType'].S_BARO						= 8;
 protocol['C_PRESENTATION']['subType'].S_WIND						= 9;
 protocol['C_PRESENTATION']['subType'].S_RAIN						= 10;
 protocol['C_PRESENTATION']['subType'].S_UV							= 11;
 protocol['C_PRESENTATION']['subType'].S_WEIGHT						= 12;
 protocol['C_PRESENTATION']['subType'].S_POWER						= 13;
 protocol['C_PRESENTATION']['subType'].S_HEATER						= 14;
 protocol['C_PRESENTATION']['subType'].S_DISTANCE					= 15;
 protocol['C_PRESENTATION']['subType'].S_LIGHT_LEVEL					= 16;
 protocol['C_PRESENTATION']['subType'].S_ARDUINO_NODE				= 17;
 protocol['C_PRESENTATION']['subType'].S_ARDUINO_REPEATER_NODE		= 18;
 protocol['C_PRESENTATION']['subType'].S_LOCK						= 19;
 protocol['C_PRESENTATION']['subType'].S_IR							= 20;
 protocol['C_PRESENTATION']['subType'].S_WATER						= 21;
 protocol['C_PRESENTATION']['subType'].S_AIR_QUALITY				= 22;
 protocol['C_PRESENTATION']['subType'].S_CUSTOM				= 23;
 protocol['C_PRESENTATION']['subType'].S_DUST				= 24;
 protocol['C_PRESENTATION']['subType'].S_SCENE_CONTROLLER				= 25;
 protocol['C_PRESENTATION']['subType'].S_RGB_LIGHT				= 26;
 protocol['C_PRESENTATION']['subType'].S_RGBW_LIGHT				= 27;
 protocol['C_PRESENTATION']['subType'].S_COLOR_SENSOR				= 28;
 protocol['C_PRESENTATION']['subType'].S_HVAC				= 29;
 protocol['C_PRESENTATION']['subType'].S_MULTIMETER				= 30;
 protocol['C_PRESENTATION']['subType'].S_SPRINKLER				= 31;
 protocol['C_PRESENTATION']['subType'].S_WATER_LEAK			= 32;
 protocol['C_PRESENTATION']['subType'].S_SOUND			= 33;
 protocol['C_PRESENTATION']['subType'].S_VIBRATION		= 34;
 protocol['C_PRESENTATION']['subType'].S_MOISTURE		= 35;
 protocol['C_PRESENTATION']['subType'].S_INFO		= 36;
 protocol['C_PRESENTATION']['subType'].S_GAS		= 37;
 protocol['C_PRESENTATION']['subType'].S_GPS	= 38;
 protocol['C_PRESENTATION']['subType'].S_WATER_QUALITY	= 38;





 protocol['C_STREAM']['subType'].ST_FIRMWARE_CONFIG_REQUEST	= 0;
 protocol['C_STREAM']['subType'].ST_FIRMWARE_CONFIG_RESPONSE	= 1;
 protocol['C_STREAM']['subType'].ST_FIRMWARE_REQUEST			= 2;
 protocol['C_STREAM']['subType'].ST_FIRMWARE_RESPONSE			= 3;
 protocol['C_STREAM']['subType'].ST_SOUND						= 4;
 protocol['C_STREAM']['subType'].ST_IMAGE						= 5;

 const P_STRING						= 0;
 const P_BYTE						= 1;
 const P_INT16						= 2;
 const P_UINT16						= 3;
 const P_LONG32						= 4;
 const P_ULONG32						= 5;
 const P_CUSTOM						= 6;

export default protocol;
