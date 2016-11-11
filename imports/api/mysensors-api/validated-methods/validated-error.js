import {ValidationError}from 'meteor/mdg:validation-error'


const validatedError = {};

validatedError.server = function(){
  throw new ValidationError([
      {
        name: 'server',
        type: 'NOT_ALLOWED',
        description : "Sorry you have to be super-admin to do this thing."
      }
    ]);


}
