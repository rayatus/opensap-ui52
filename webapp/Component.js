sap.ui.define([
    "sap/ui/core/UIComponent"

 ], function (UIComponent) {
    "use strict";

    return UIComponent.extend("com.jsancho.sap.opensap.ui52.Component", {
       metadata : {
             manifest: "json"
       },

       init : function () {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
         // routing enablement
         this.getRouter().initialize();
       }
    });

 });