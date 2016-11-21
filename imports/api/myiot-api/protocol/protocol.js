/**
 *
 * My sensors protocol definitions
 * please see https://www.mysensors.org/download/serial_api_20
 */

import _ from 'underscore';
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
protocol['COMMANDS'] = ['C_PRESENTATION','C_SET','C_REQ','C_INTERNAL','C_STREAM'];

protocol['NODE_SENSOR_ID'] = 255;
protocol['BROADCAST_ADDRESS'] = 255;
protocol['FIRMWARE_BLOCK_SIZE'] = 16;


protocol['C_PRESENTATION'] = {};
protocol['C_SET'] = {};
protocol['C_REQ'] = {};
protocol['C_INTERNAL'] = {};
protocol['C_STREAM'] = {};

/*

use indexes to obtain value
protocol['C_PRESENTATION'].value = C_PRESENTATION;
protocol['C_SET'].value = C_SET;
protocol['C_REQ'].value = C_REQ;
protocol['C_INTERNAL'].value = C_INTERNAL;
protocol['C_STREAM'].value = C_STREAM;
*/

protocol['C_SET'].V_TEMP						= 0;
protocol['C_SET'].V_HUM							= 1;
protocol['C_SET'].V_LIGHT						= 2;
protocol['C_SET'].V_DIMMER						= 3;
protocol['C_SET'].V_PRESSURE					= 4;
protocol['C_SET'].V_FORECAST					= 5;
protocol['C_SET'].V_RAIN						= 6;
protocol['C_SET'].V_RAINRATE					= 7;
protocol['C_SET'].V_WIND						= 8;
protocol['C_SET'].V_GUST						= 9;
protocol['C_SET'].V_DIRECTION					= 10;
protocol['C_SET'].V_UV							= 11;
protocol['C_SET'].V_WEIGHT						= 12;
protocol['C_SET'].V_DISTANCE					= 13;
protocol['C_SET'].V_IMPEDANCE					= 14;
protocol['C_SET'].V_ARMED						= 15;
protocol['C_SET'].V_TRIPPED						= 16;
protocol['C_SET'].V_WATT						= 17;
protocol['C_SET'].V_KWH							= 18;
protocol['C_SET'].V_SCENE_ON					= 19;
protocol['C_SET'].V_SCENE_OFF					= 20;
protocol['C_SET'].V_HEATER						= 21;
protocol['C_SET'].V_HEATER_SW					= 22;
protocol['C_SET'].V_LIGHT_LEVEL					= 23;
protocol['C_SET'].V_VAR1						= 24;
protocol['C_SET'].V_VAR2						= 25;
protocol['C_SET'].V_VAR3						= 26;
protocol['C_SET'].V_VAR4						= 27;
protocol['C_SET'].V_VAR5						= 28;
protocol['C_SET'].V_UP							= 29;
protocol['C_SET'].V_DOWN						= 30;
protocol['C_SET'].V_STOP						= 31;
protocol['C_SET'].V_IR_SEND						= 32;
protocol['C_SET'].V_IR_RECEIVE					= 33;
protocol['C_SET'].V_FLOW						= 34;
protocol['C_SET'].V_VOLUME						= 35;
protocol['C_SET'].V_LOCK_STATUS					= 36;
protocol['C_SET'].V_LEVEL					= 37;
protocol['C_SET'].V_VOLTAGE					= 38;
protocol['C_SET'].V_CURRENT					= 39;
protocol['C_SET'].V_RGB					= 40;
protocol['C_SET'].V_RGBW					= 41;
protocol['C_SET'].V_ID				= 42;
protocol['C_SET'].V_UNIT_PREFIX				= 43;
protocol['C_SET'].V_HVAC_SETPOINT_COOL			= 44;
protocol['C_SET'].V_HVAC_SETPOINT_HEAT			= 45;
protocol['C_SET'].V_HVAC_FLOW_MODE	= 46;
protocol['C_SET'].V_TEXT = 47;
protocol['C_SET'].V_CUSTOM = 48;
protocol['C_SET'].V_POSITION = 49;
protocol['C_SET'].V_IR_RECORD = 50;
protocol['C_SET'].V_PH = 51;
protocol['C_SET'].V_ORP = 52;
protocol['C_SET'].V_EC = 53;
protocol['C_SET'].V_VAR = 54;
protocol['C_SET'].V_VA = 55;
protocol['C_SET'].V_POWER_FACTOR = 56;


protocol['C_REQ'] = protocol['C_SET'];



protocol['C_INTERNAL'].I_BATTERY_LEVEL				= 0;
protocol['C_INTERNAL'].I_TIME						= 1;
protocol['C_INTERNAL'].I_VERSION						= 2;
protocol['C_INTERNAL'].I_ID_REQUEST					= 3;
protocol['C_INTERNAL'].I_ID_RESPONSE					= 4;
protocol['C_INTERNAL'].I_INCLUSION_MODE				= 5;
protocol['C_INTERNAL'].I_CONFIG						= 6;
protocol['C_INTERNAL'].I_FIND_PARENT					= 7;
protocol['C_INTERNAL'].I_FIND_PARENT_RESPONSE					= 8;
protocol['C_INTERNAL'].I_LOG_MESSAGE					= 9;
protocol['C_INTERNAL'].I_CHILDREN					= 10;
protocol['C_INTERNAL'].I_SKETCH_NAME					= 11;
protocol['C_INTERNAL'].I_SKETCH_VERSION				= 12;
protocol['C_INTERNAL'].I_REBOOT						= 13;
protocol['C_INTERNAL'].I_GATEWAY_READY	= 14;
protocol['C_INTERNAL'].I_REQUEST_SIGNING	= 15;
protocol['C_INTERNAL'].I_GET_NONCE =	16;
protocol['C_INTERNAL'].I_GET_NONCE_RESPONSE = 17;
protocol['C_INTERNAL'].I_HEARTBEAT	= 18;
protocol['C_INTERNAL'].I_PRESENTATION =	19;
protocol['C_INTERNAL'].I_DISCOVER = 20;
protocol['C_INTERNAL'].I_DISCOVER_RESPONSE	= 21;
protocol['C_INTERNAL'].I_HEARTBEAT_RESPONSE	= 22;
protocol['C_INTERNAL'].I_LOCKED	= 23;
protocol['C_INTERNAL'].I_PING =	24;
protocol['C_INTERNAL'].I_PONG =	25;
protocol['C_INTERNAL'].I_REGISTRATION_REQUEST =	26;
protocol['C_INTERNAL'].I_REGISTRATION_RESPONSE =	27;
protocol['C_INTERNAL'].I_DEBUG	=28;




protocol['C_PRESENTATION'].S_DOOR						= 0;
protocol['C_PRESENTATION'].S_MOTION						= 1;
protocol['C_PRESENTATION'].S_SMOKE						= 2;
protocol['C_PRESENTATION'].S_LIGHT						= 3;
protocol['C_PRESENTATION'].S_DIMMER						= 4;
protocol['C_PRESENTATION'].S_COVER						= 5;
protocol['C_PRESENTATION'].S_TEMP						= 6;
protocol['C_PRESENTATION'].S_HUM							= 7;
protocol['C_PRESENTATION'].S_BARO						= 8;
protocol['C_PRESENTATION'].S_WIND						= 9;
protocol['C_PRESENTATION'].S_RAIN						= 10;
protocol['C_PRESENTATION'].S_UV							= 11;
protocol['C_PRESENTATION'].S_WEIGHT						= 12;
protocol['C_PRESENTATION'].S_POWER						= 13;
protocol['C_PRESENTATION'].S_HEATER						= 14;
protocol['C_PRESENTATION'].S_DISTANCE					= 15;
protocol['C_PRESENTATION'].S_LIGHT_LEVEL					= 16;
protocol['C_PRESENTATION'].S_ARDUINO_NODE				= 17;
protocol['C_PRESENTATION'].S_ARDUINO_REPEATER_NODE		= 18;
protocol['C_PRESENTATION'].S_LOCK						= 19;
protocol['C_PRESENTATION'].S_IR							= 20;
protocol['C_PRESENTATION'].S_WATER						= 21;
protocol['C_PRESENTATION'].S_AIR_QUALITY				= 22;
protocol['C_PRESENTATION'].S_CUSTOM				= 23;
protocol['C_PRESENTATION'].S_DUST				= 24;
protocol['C_PRESENTATION'].S_SCENE_CONTROLLER				= 25;
protocol['C_PRESENTATION'].S_RGB_LIGHT				= 26;
protocol['C_PRESENTATION'].S_RGBW_LIGHT				= 27;
protocol['C_PRESENTATION'].S_COLOR_SENSOR				= 28;
protocol['C_PRESENTATION'].S_HVAC				= 29;
protocol['C_PRESENTATION'].S_MULTIMETER				= 30;
protocol['C_PRESENTATION'].S_SPRINKLER				= 31;
protocol['C_PRESENTATION'].S_WATER_LEAK			= 32;
protocol['C_PRESENTATION'].S_SOUND			= 33;
protocol['C_PRESENTATION'].S_VIBRATION		= 34;
protocol['C_PRESENTATION'].S_MOISTURE		= 35;
protocol['C_PRESENTATION'].S_INFO		= 36;
protocol['C_PRESENTATION'].S_GAS		= 37;
protocol['C_PRESENTATION'].S_GPS	= 38;
protocol['C_PRESENTATION'].S_WATER_QUALITY	= 38;



/*
 protocol['C_STREAM'].ST_FIRMWARE_CONFIG_REQUEST	= 0;
 protocol['C_STREAM'].ST_FIRMWARE_CONFIG_RESPONSE	= 1;
 protocol['C_STREAM'].ST_FIRMWARE_REQUEST			= 2;
 protocol['C_STREAM'].ST_FIRMWARE_RESPONSE			= 3;
 protocol['C_STREAM'].ST_SOUND						= 4;
 protocol['C_STREAM'].ST_IMAGE						= 5;
*/

// protocol used for user interaction
//protocol['C_USER']["sensor"].Button
// protocol definitions used by actions
protocol['SENSORS'] = {};

protocol['SENSORS'].S_DOOR	= ['V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_MOTION	= ['V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_SMOKE	= ['V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_LIGHT	= ['V_STATUS', 'V_WATT'];
protocol['SENSORS'].S_BINARY	= ['V_STATUS', 'V_WATT'];
protocol['SENSORS'].S_DIMMER = [	'V_STATUS', 'V_PERCENTAGE', 'V_WATT'];
protocol['SENSORS'].S_COVER						= [	'V_UP', 'V_DOWN', 'V_STOP', 'V_PERCENTAGE'];
protocol['SENSORS'].S_TEMP						= [		'V_TEMP', 'V_ID'];
protocol['SENSORS'].S_HUM							= [	'V_HUM'];
protocol['SENSORS'].S_BARO						= [	'V_PRESSURE', 'V_FORECAST'];
protocol['SENSORS'].S_WIND						= [	'V_WIND', 'V_GUST', 'V_DIRECTION'];
protocol['SENSORS'].S_RAIN						= [	'V_RAIN', 'V_RAINRATE'];
protocol['SENSORS'].S_UV							= [	'V_UV'];
protocol['SENSORS'].S_WEIGHT						= [	'V_WEIGHT', 'V_IMPEDANCE'];
protocol['SENSORS'].S_POWER						= [	'V_WATT', 'V_KWH'];
protocol['SENSORS'].S_HEATER						= [	'V_HVAC_SETPOINT_HEAT', 'V_HVAC_FLOW_STATE', 'V_TEMP'];
protocol['SENSORS'].S_DISTANCE					= [	'V_DISTANCE', 'V_UNIT_PREFIX'];
protocol['SENSORS'].S_LIGHT_LEVEL					= [	'V_LIGHT_LEVEL', 'V_LEVEL'];
protocol['SENSORS'].S_ARDUINO_NODE				= [	];
protocol['SENSORS'].S_ARDUINO_REPEATER_NODE		= [];
protocol['SENSORS'].S_LOCK						= [	'V_LOCK_STATUS'];
protocol['SENSORS'].S_IR							= [	'V_IR_SEND', 'V_IR_RECEIVE'];
protocol['SENSORS'].S_WATER						= [	'V_FLOW', 'V_VOLUME'];
protocol['SENSORS'].S_AIR_QUALITY				= [	'V_LEVEL', 'V_UNIT_PREFIX'];
protocol['SENSORS'].S_CUSTOM				= [	'V_CUSTOM'];
protocol['SENSORS'].S_DUST				= [	'V_LEVEL', 'V_UNIT_PREFIX'];
protocol['SENSORS'].S_SCENE_CONTROLLER				= [	'V_SCENE_ON', 'V_SCENE_OFF'];
protocol['SENSORS'].S_RGB_LIGHT				= [	'V_RGB', 'V_WATT'];
protocol['SENSORS'].S_RGBW_LIGHT				= [	'V_RGBW', 'V_WATT'];
protocol['SENSORS'].S_COLOR_SENSOR				= [	'V_RGB'];
protocol['SENSORS'].S_HVAC				= [	'V_HVAC_SETPOINT_HEAT', 'V_HVAC_SETPOINT_COLD', 'V_HVAC_FLOW_STATE', 'V_HVAC_FLOW_MODE', 'V_HVAC_SPEED'];
protocol['SENSORS'].S_MULTIMETER				= [	'V_VOLTAGE', 'V_CURRENT', 'V_IMPEDANCE'];
protocol['SENSORS'].S_SPRINKLER				= [	'V_STATUS', 'V_PERCENTAGE', 'V_WATT'];
protocol['SENSORS'].S_WATER_LEAK			= ['V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_SOUND			= [	'V_LEVEL', 'V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_VIBRATION		= [	'V_LEVEL', 'V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_MOISTURE		= [	'V_LEVEL', 'V_TRIPPED', 'V_ARMED'];
protocol['SENSORS'].S_INFO		= [	'V_TEXT'];
protocol['SENSORS'].S_GAS		= [	'V_FLOW', 'V_VOLUME'];
protocol['SENSORS'].S_GPS	= [	'V_POSITION'];
protocol['SENSORS'].S_WATER_QUALITY	= [	'V_TEMP', 'V_PH', 'V_ORP', 'V_EC', 'V_STATUS'];
/**
 * array of user sensors
 */
protocol['USERSENSORS'] = {};

protocol['USERSENSORS']['U_BUTTON'] = ['click', 'dbclick'];
protocol['USERSENSORS']['U_SLIDER'] = ['change'];
protocol['USERSENSORS']['U_SELECT'] = ['change'];
protocol['USERSENSORS']['U_RADIO'] = ['change'];
protocol['USERSENSORS']['U_TEXT'] = ['change'];

// append vars to the end
_.each(protocol['SENSORS'], function(value,key){
  //if(key!='S_ARDUINO_REPEATER_NODE'||key!='S_ARDUINO_NODE'){
    protocol['SENSORS'][key].push('V_VAR1', 'V_VAR2','V_VAR3', 'V_VAR4', 'V_VAR5');
//  }
})

protocol['CONDITIONS'] = {};
protocol['CONDITIONS']['HARDWARE'] = ['=','>','>=','<','<=','fallingEdge','risingEdge'];
protocol['CONDITIONS']['USERCONTROL'] = ['click', 'dbclick', 'change'];
protocol['CONDITIONS']['TIMER'] = {};
protocol['CONDITIONS']['TIMER']['interval'] = ['setInterval', 'clearTimer'];
protocol['CONDITIONS']['TIMER']['timeout'] = ['setTimeout', 'clearTimer'];
protocol['CONDITIONS']['TIMER']['trigger'] = ['clearTimer','trigger'];


protocol['ACTIONS'] = {};
protocol['ACTIONS']['HARDWARE'] = ['hardware'];
protocol['ACTIONS']['TIMER'] = ['setInterval', 'setTimeout', 'clearTimer'];
protocol['ACTIONS']['USERCONTROL'] = ['userControl'];
protocol['ACTIONS']['TIMER']['interval'] = ['setInterval', 'clearTimer'];
protocol['ACTIONS']['TIMER']['scheduled'] = [ 'stopTimer', 'clearTimer', 'initTimer'];
protocol['ACTIONS']['TIMER']['trigger'] = ['trigger','clearTimer'];


export default protocol;
