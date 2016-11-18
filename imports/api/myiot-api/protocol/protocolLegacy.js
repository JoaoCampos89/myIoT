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
import _ from 'underscore';


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
 protocol['COMMANDS'] = [];
 protocol['COMMANDS'].push({name:'C_PRESENTATION', value: C_PRESENTATION});
 protocol['COMMANDS'].push({name:'C_SET', value: C_SET});
 protocol['COMMANDS'].push({name:'C_REQ', value: C_REQ});
 protocol['COMMANDS'].push({name:'C_INTERNAL', value: C_INTERNAL});
 protocol['COMMANDS'].push({name:'C_STREAM', value: C_STREAM});



 protocol['NODE_SENSOR_ID'] = 255;
 protocol['BROADCAST_ADDRESS'] = 255;
 protocol['FIRMWARE_BLOCK_SIZE'] = 16;


 protocol['C_PRESENTATION'] = [];
 protocol['C_SET'] = [];
 protocol['C_REQ'] = [];
 protocol['C_INTERNAL'] = [];
 protocol['C_STREAM'] = [];

/*
 protocol['C_PRESENTATION'].value = C_PRESENTATION;
 protocol['C_SET'].value = C_SET;
 protocol['C_REQ'].value = C_REQ;
 protocol['C_INTERNAL'].value = C_INTERNAL;
 protocol['C_STREAM'].value = C_STREAM;
*/

protocol['C_SET'].push({name:'V_TEMP',value: 0});
protocol['C_SET'].push({name:'V_HUM'	,value: 1});
protocol['C_SET'].push({name:'V_STATUS',value: 2});
protocol['C_SET'].push({name:'V_DIMMER',value: 3});
protocol['C_SET'].push({name:'V_PRESSURE',value: 4});
protocol['C_SET'].push({name:'V_FORECAST',value: 5});
protocol['C_SET'].push({name:'V_RAIN',value: 6});
protocol['C_SET'].push({name:'V_RAINRATE',value: 7});
protocol['C_SET'].push({name:'V_WIND',value: 8});
protocol['C_SET'].push({name:'V_GUST',value: 9});
protocol['C_SET'].push({name:'V_DIRECTION',value: 10});
protocol['C_SET'].push({name:'V_UV',value: 11});
protocol['C_SET'].push({name:'V_WEIGHT',value: 12});
protocol['C_SET'].push({name:'V_DISTANCE',value: 13});
protocol['C_SET'].push({name:'V_IMPEDANCE',value: 14});
protocol['C_SET'].push({name:'V_ARMED',value: 15});
protocol['C_SET'].push({name:'V_TRIPPED',value: 16});
protocol['C_SET'].push({name:'V_WATT',value: 17});
protocol['C_SET'].push({name:'V_KWH',value: 18});
protocol['C_SET'].push({name:'V_SCENE_ON',value: 19});
protocol['C_SET'].push({name:'V_SCENE_OFF',value: 20});
protocol['C_SET'].push({name:'V_HEATER',value: 21});
protocol['C_SET'].push({name:'V_HEATER_SW',value: 22});
protocol['C_SET'].push({name:'V_LIGHT_LEVEL',value: 23});
protocol['C_SET'].push({name:'V_VAR1',value: 24});
protocol['C_SET'].push({name:'V_VAR2',value: 25});
protocol['C_SET'].push({name:'V_VAR3',value: 26});
protocol['C_SET'].push({name:'V_VAR4',value: 27});
protocol['C_SET'].push({name:'V_VAR5',value: 28});
protocol['C_SET'].push({name:'V_UP',value: 29});
protocol['C_SET'].push({name:'V_DOWN',value: 30});
protocol['C_SET'].push({name:'V_STOP',value: 31});
protocol['C_SET'].push({name:'V_IR_SEND',value: 32});
protocol['C_SET'].push({name:'V_IR_RECEIVE',value: 33});
protocol['C_SET'].push({name:'V_FLOW',value: 34});
protocol['C_SET'].push({name:'V_VOLUME',value: 35});
protocol['C_SET'].push({name:'V_LOCK_STATUS',value: 36});
protocol['C_SET'].push({name:'V_LEVEL',value: 37});
protocol['C_SET'].push({name:'V_VOLTAGE',value: 38});
protocol['C_SET'].push({name:'V_CURRENT',value: 39});
protocol['C_SET'].push({name:'V_RGB',value: 40});
protocol['C_SET'].push({name:'V_RGBW',value: 41});
protocol['C_SET'].push({name:'V_ID' ,value: 42});
protocol['C_SET'].push({name:'V_UNIT_PREFIX'	,value: 43});
protocol['C_SET'].push({name:'V_HVAC_SETPOINT_COOL',value: 44});
protocol['C_SET'].push({name:'V_HVAC_SETPOINT_HEAT',value: 45});
protocol['C_SET'].push({name:'V_HVAC_FLOW_MODE' ,value: 46});
protocol['C_SET'].push({name:'V_TEXT', value: 47});
protocol['C_SET'].push({name:'V_CUSTOM', value: 48});
protocol['C_SET'].push({name:'V_POSITION', value: 49});
protocol['C_SET'].push({name:'V_IR_RECORD',value: 50});
protocol['C_SET'].push({name:'V_PH', value: 51});
protocol['C_SET'].push({name:'V_ORP', value: 52});
protocol['C_SET'].push({name:'V_EC', value: 53});
protocol['C_SET'].push({name:'V_VAR', value: 54});
protocol['C_SET'].push({name:'V_VA', value: 55});
protocol['C_SET'].push({name:'V_POWER_FACTOR', value: 56});


 protocol['C_REQ'] = protocol['C_SET'];



 protocol['C_INTERNAL'].push({name:'I_BATTERY_LEVEL', value: 0});
 protocol['C_INTERNAL'].push({name:'I_TIME', value: 1});
 protocol['C_INTERNAL'].push({name:'I_VERSION	', value: 2});
 protocol['C_INTERNAL'].push({name:'I_ID_REQUEST', value: 3});
 protocol['C_INTERNAL'].push({name:'I_ID_RESPONSE', value: 4});
 protocol['C_INTERNAL'].push({name:'I_INCLUSION_MODE', value: 5});
 protocol['C_INTERNAL'].push({name:'I_CONFIG', value: 6});
 protocol['C_INTERNAL'].push({name:'I_FIND_PARENT', value: 7});
 protocol['C_INTERNAL'].push({name:'I_FIND_PARENT_RESPONSE', value: 8});
 protocol['C_INTERNAL'].push({name:'I_LOG_MESSAGE', value: 9});
 protocol['C_INTERNAL'].push({name:'I_CHILDREN', value: 10});
 protocol['C_INTERNAL'].push({name:'I_SKETCH_NAME', value: 11});
 protocol['C_INTERNAL'].push({name:'I_SKETCH_VERSION', value: 12});
 protocol['C_INTERNAL'].push({name:'I_REBOOT', value: 13});
 protocol['C_INTERNAL'].push({name:'I_GATEWAY_READY', value: 14});
 protocol['C_INTERNAL'].push({name:'I_REQUEST_SIGNING', value: 15});
 protocol['C_INTERNAL'].push({name:'I_GET_NONCE', value:	16});
 protocol['C_INTERNAL'].push({name:'I_GET_NONCE_RESPONSE', value: 17});
 protocol['C_INTERNAL'].push({name:'I_HEARTBEAT', value: 18});
 protocol['C_INTERNAL'].push({name:'I_PRESENTATION', value:	19});
 protocol['C_INTERNAL'].push({name:'I_DISCOVER', value: 20});
 protocol['C_INTERNAL'].push({name:'I_DISCOVER_RESPONSE', value: 21});
 protocol['C_INTERNAL'].push({name:'I_HEARTBEAT_RESPONSE', value: 22});
 protocol['C_INTERNAL'].push({name:'I_LOCKED', value: 23});
 protocol['C_INTERNAL'].push({name:'I_PING', value:	24});
 protocol['C_INTERNAL'].push({name:'I_PONG', value:	25});
 protocol['C_INTERNAL'].push({name:'I_REGISTRATION_REQUEST', value:	26});
 protocol['C_INTERNAL'].push({name:'I_REGISTRATION_RESPONSE', value:	27});
 protocol['C_INTERNAL'].push({name:'I_DEBUG', value:28});




 protocol['C_PRESENTATION'].push({name:'S_DOOR', value:   0});
 protocol['C_PRESENTATION'].push({name:'S_MOTION', value:   1});
 protocol['C_PRESENTATION'].push({name:'S_SMOKE', value:   2});
 protocol['C_PRESENTATION'].push({name:'S_LIGHT', value:   3});
 protocol['C_PRESENTATION'].push({name:'S_DIMMER', value:   4});
 protocol['C_PRESENTATION'].push({name:'S_COVER', value:   5});
 protocol['C_PRESENTATION'].push({name:'S_TEMP', value:   6});
 protocol['C_PRESENTATION'].push({name:'S_HUM', value:   7});
 protocol['C_PRESENTATION'].push({name:'S_BARO', value:   8});
 protocol['C_PRESENTATION'].push({name:'S_WIND', value:   9});
 protocol['C_PRESENTATION'].push({name:'S_RAIN', value:   10});
 protocol['C_PRESENTATION'].push({name:'S_UV', value:   11});
 protocol['C_PRESENTATION'].push({name:'S_WEIGHT', value:   12});
 protocol['C_PRESENTATION'].push({name:'S_POWER', value:   13});
 protocol['C_PRESENTATION'].push({name:'S_HEATER', value:   14});
 protocol['C_PRESENTATION'].push({name:'S_DISTANCE', value:   15});
 protocol['C_PRESENTATION'].push({name:'S_LIGHT_LEVEL', value:   16});
 protocol['C_PRESENTATION'].push({name:'S_ARDUINO_NODE', value:   17});
 protocol['C_PRESENTATION'].push({name:'S_ARDUINO_REPEATER_NODE', value:   18});
 protocol['C_PRESENTATION'].push({name:'S_LOCK', value:   19});
 protocol['C_PRESENTATION'].push({name:'S_IR', value:   20});
 protocol['C_PRESENTATION'].push({name:'S_WATER', value:   21});
 protocol['C_PRESENTATION'].push({name:'S_AIR_QUALITY', value:   22});
 protocol['C_PRESENTATION'].push({name:'S_CUSTOM', value:   23});
 protocol['C_PRESENTATION'].push({name:'S_DUST', value:   24});
 protocol['C_PRESENTATION'].push({name:'S_SCENE_CONTROLLER', value:   25});
 protocol['C_PRESENTATION'].push({name:'S_RGB_LIGHT', value:   26});
 protocol['C_PRESENTATION'].push({name:'S_RGBW_LIGHT', value:   27});
 protocol['C_PRESENTATION'].push({name:'S_COLOR_SENSOR', value:   28});
 protocol['C_PRESENTATION'].push({name:'S_HVAC', value:   29});
 protocol['C_PRESENTATION'].push({name:'S_MULTIMETER', value:   30});
 protocol['C_PRESENTATION'].push({name:'S_SPRINKLER', value:   31});
 protocol['C_PRESENTATION'].push({name:'S_WATER_LEAK', value:   32});
 protocol['C_PRESENTATION'].push({name:'S_SOUND', value:   33});
 protocol['C_PRESENTATION'].push({name:'S_VIBRATION', value:   34});
 protocol['C_PRESENTATION'].push({name:'S_MOISTURE', value:   35});
 protocol['C_PRESENTATION'].push({name:'S_INFO', value:   36});
 protocol['C_PRESENTATION'].push({name:'S_GAS', value:   37});
 protocol['C_PRESENTATION'].push({name:'S_GPS', value:   38});
 protocol['C_PRESENTATION'].push({name:'S_WATER_QUALITY	', value:   38});




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
protocol['SENSORS'].S_CUSTOM				= [	'V_COSTUM'];
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
protocol['USERSENSORS'] = [];
protocol['USERSENSORS'].push({name:'U_BUTTON', events:['click', 'dbclick']});
protocol['USERSENSORS'].push({name:'U_SLIDER', events:['change']});
protocol['USERSENSORS'].push({name:'U_SELECT', events:['change']});
protocol['USERSENSORS'].push({name:'U_RADIO', events:['change']});
protocol['USERSENSORS'].push({name:'U_TEXT', events:[]});

// append vars to the end
_.each(protocol['SENSORS'], function(value,key){
  //if(key!='S_ARDUINO_REPEATER_NODE'||key!='S_ARDUINO_NODE'){
    protocol['SENSORS'][key].push('V_VAR1', 'V_VAR2','V_VAR3', 'V_VAR4', 'V_VAR5');
//  }
})

protocol['CONDITIONS'] = {};
protocol['CONDITIONS']['HARDWARE'] = ['=','>','>=','<','<=','fallingEdge','risingEdge'];
protocol['CONDITIONS']['USERCONTROL'] = ['click', 'dbclick', 'change'];
protocol['CONDITIONS']['TIMER'] = ['setInterval', 'setTimeout', 'clearTimer'];

protocol['ACTIONS'] = {};
protocol['ACTIONS']['HARDWARE'] = ['hardware'];
protocol['ACTIONS']['TIMER'] = ['setInterval', 'setTimeout', 'clearTimer'];
protocol['ACTIONS']['USERCONTROL'] = ['userControl'];



export default protocol;
