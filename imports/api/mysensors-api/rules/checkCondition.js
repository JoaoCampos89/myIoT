export default function(type, previousValue, value, limit){
      switch (type) {
        case '<': {
          if(value<limit)
            return true
          break;
        }
        case '<=': {
          if(value<=limit)
            return true
          break;
        }
        case '=': {
          if(value==limit)
            return true
          break;
        }
        case '>': {
          if(value>limit)
            return true
          break;
        }
        case '>=': {
          if(value>=limit)
            return true
          break;
        }
        case 'risingEdge':{
          if(previousValue<value){
            return false;
          }
          break;
        }
        case 'fallingEdge':{
          if(previousValue>value){
            return true;
          }
          break;
        }
        default:

      }


      return false;



}
