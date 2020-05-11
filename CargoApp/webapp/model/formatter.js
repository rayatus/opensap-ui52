sap.ui.define([], function () {
  "use strict";
  
	return {

    lifecycleStatus_State : function(sStatus){
      switch(sStatus){
        case 'N': //New
          return 'None';
          break;
        case 'P': //In Progress
          return 'Information'
          break;
        case 'C': //Closed
          return 'Success';
          break;
        case 'X': //Cancelled
          return 'Error';
          break;
      }
    }
	};
});