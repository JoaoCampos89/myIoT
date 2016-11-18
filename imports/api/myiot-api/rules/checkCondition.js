export default function({type, previousValue, value, threshold}){
      switch (type) {
        case '<': {
          if(value<threshold)
            return true
          break;
        }
        case '<=': {
          if(value<=threshold)
            return true
          break;
        }
        case '=': {
          if(value==threshold)
            return true
          break;
        }
        case '>': {
          if(value>threshold)
            return true
          break;
        }
        case '>=': {
          if(value>=threshold)
            return true
          break;
        }
        case 'risingEdge':{
          if(previousValue-value<threshold){
            return true;
          }
          break;
        }
        case 'fallingEdge':{
          if(previousValue-value>threshold){
            return true;
          }
          break;
        }
        case 'click':{
          if(value == threshold){
            return true;
          }
          break;
        }
        case 'change': {
          if(Math.abs(previousValue-value)>threshold){
            return true;
          }
          break;
        }
        case 'dbclick':{
          if(value == threshold){
            return true;
          }
          break;
        }
        default:

      }


      return false;



}
