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
          if(previousValue-value<limit){
            return true;
          }
          break;
        }
        case 'fallingEdge':{
          if(previousValue-value>limit){
            return true;
          }
          break;
        }
        default:

      }


      return false;



}
