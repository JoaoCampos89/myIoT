import {ValidationError}from 'meteor/mdg:validation-error'
const appError = {};


appError.onlyAdmin = function(){
  throw new ValidationError([
      {
        name: 'server',
        type: 'NOT_ALLOWED',
        description : "Sorry you have to be admin to do this thing."
      }
    ]);
}

appError.onlySuperAdmin = function(){
  throw new ValidationError([
      {
        name: 'server',
        type: 'NOT_ALLOWED',
        description : "Sorry you have to be super-admin to do this thing."
      }
    ]);
}

appError.onlyLogged = function(){
  throw new ValidationError([
      {
        name: 'server',
        type: 'NOT_ALLOWED',
        description : "Sorry you have to be logged to do this thing."
      }
    ]);
}

export default appError;
