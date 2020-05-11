
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library"

 ], function (UIComponent, JSONModel, Device, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
    "use strict";

    return UIComponent.extend("com.jsancho.sap.opensap.ui52.cargo.Component", {
       
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

         // routing enablement and hooking for specifying custom additional URL parameters
         let oRouter = this.getRouter();
         oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
         oRouter.initialize();
       },

       _onBeforeRouteMatched: function(oEvent) {
         this._handleFlexibleColumnLayout(oEvent);			
      },
      
      _handleFlexibleColumnLayout : function (oEvent) {
         //Let's create a specific model for handling layout FlexibleColumnLayout 'layout' attribute
         let oModel = this.getModel('fcl');
         if (!oModel){
            oModel = new JSONModel();
            this.setModel(oModel, 'fcl');
         }

         //Read at URL if there's a "layout" parameter where we are specifying which layout to we need to use
         let sLayout = oEvent.getParameters().arguments.layout;

         // If there is no layout parameter, query at FlexibleColumnLayoutHelper for the default level 0 layout 
         // which we have specified in the getHelper function
         if (!sLayout) {
            this.getHelper().then(function(oHelper){ 
               let oNextUIState = oHelper.getNextUIState(0);
               oModel.setProperty('/layout',oNextUIState.layout);
            });
            return;
         }

         oModel.setProperty('/layout',sLayout);
         
      },

      getHelper: function () {
			return this._getFcl().then(function(oFCL) {
				var oSettings = {
					defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
				};
				return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
			});
      },
      
      _getFcl: function () {
			return new Promise(function(resolve, reject) {
				var oFCL = this.getRootControl().byId('appFlexibleColumnLayout');
				if (!oFCL) {
					this.getRootControl().attachAfterInit(function(oEvent) {
						resolve(oEvent.getSource().byId('appFlexibleColumnLayout'));
					}, this);
					return;
				}
				resolve(oFCL);

			}.bind(this));
      }
      
    });

 });