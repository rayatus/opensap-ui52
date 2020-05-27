sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"

], function (UIComponent, JSONModel, Device) {
  "use strict";

  return UIComponent.extend("com.jsancho.sap.opensap.ui52.Component", {
     metadata : {
           manifest: "json"
     },

     init : function () {
       // call the init function of the parent
       UIComponent.prototype.init.apply(this, arguments);
       
       // setting device model     
       let oDeviceModel = new JSONModel(Device)
       oDeviceModel.setDefaultBindingMode("OneWay")     
       this.setModel(oDeviceModel, "device");

       // routing enablement
       this.getRouter().initialize();
     }
  });

});