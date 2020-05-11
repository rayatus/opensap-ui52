sap.ui.define([
	"com/jsancho/sap/opensap/ui52/cargo/controller/BaseController",
	"../model/formatter",
  
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("com.jsancho.sap.opensap.ui52.cargo.controller.SalesOrderList", {

		formatter : formatter,

		onItemClicked : function(oEvent){

			//now in sPath we have something like --> /SalesOrderSet('0500000000')
			let sPath    = oEvent.getSource().getBindingContext().getPath();
			let sOrderId = sPath.split("'")[1];

			//Let's tell the FlexibleColumnLayout that needs to change its layout 
			//for displaying second column. We use the "layout" URL parameter for that
			this.getOwnerComponent().getHelper().then(function (oHelper) {
				this.getRouter().navTo("salesOrderDetail", { 
						layout  : oHelper.getNextUIState(1).layout,
						orderId : sOrderId 
				});
			}.bind(this));

			

		}

	});
});