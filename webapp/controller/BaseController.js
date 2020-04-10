sap.ui.define([
  "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
  "sap/ui/core/UIComponent"
  
], function(Controller, History, UIComponent) {
  'use strict';
  
  return Controller.extend("com.jsancho.sap.opensap.ui52.controller.BaseController", {
    
    getRouter : function () {
      return UIComponent.getRouterFor(this);
    },

    onNavBack: function () {

      let oHistory = History.getInstance();
      let sPreviousHash = oHistory.getPreviousHash();
  
      if (sPreviousHash !== undefined) {
        //Just go back
        window.history.go(-1);
      } else {
        //In case there's no history lets navigate allways to HOME page
        this.getRouter().navTo("home", {}, true );
      }
    }

  });
});