sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/resource/ResourceModel"
  
], function(Controller, ResourceModel) {
	"use strict";

	return Controller.extend("com.jsancho.sap.opensap.ui52.controller.Home", {

    onInit: function(){
      // set i18n model on view
      var i18nModel = new ResourceModel({ 
        bundleName: "com.jsancho.sap.opensap.ui52.i18n.i18n" 
      });
      this.getView().setModel(i18nModel, "i18n");
    },

    onPressFindMovies : function(oEvent){
      var oView = this.getView(); //Because inside requiere's callback THIS referes to WINDOW

      sap.ui.require([
        "sap/m/MessageToast"
      ], function(MessageToast){
        var oBundle = oView.getModel("i18n").getResourceBundle();
        MessageToast.show(oBundle.getText("searching"));
      });
    }

	});
});