sap.ui.define([
	"com/jsancho/sap/opensap/ui52/cargo/controller/BaseController",

  
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.jsancho.sap.opensap.ui52.cargo.controller.SalesOrderDetail", {

		onInit : function(){
			this.getRouter().getRoute("salesOrderDetail").attachMatched(this._onRouteMatched, this);
		},
		
    _onRouteMatched : function(oEvent){
      // Retrieve mandatory data from the URL in order to determine which 
			// salesOrder we are displaying
			let sOrderId = oEvent.getParameter("arguments").orderId;

			this.getView().bindElement({
				path : `/SalesOrderSet('${sOrderId}')`,
				events : {
					change : this._onBindingChanged.bind(this)
				}
			});
    },

    _onBindingChanged : function(){
			let sPath = this.getView().getElementBinding().getPath();

			// lets try to load the object within the model according to the given path, if it doesn't exist
			// lets navigate to the NotFound page
			if (!this.getView().getModel().getObject(sPath)) {
				this.getRouter().getTargets().display("notFound");
			}
		}

	});
});