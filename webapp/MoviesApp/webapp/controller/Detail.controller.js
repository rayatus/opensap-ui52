sap.ui.define([
  "com/jsancho/sap/opensap/ui52/controller/BaseController"
  
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.jsancho.sap.opensap.ui52.controller.Detail", {

		onInit : function(){
			this.getRouter().getRoute("detail").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent){

			// Retrieve mandatory data from the URL in order to determine which 
			// appointment we are displaying
			let movieId = oEvent.getParameter("arguments").movieId;
			let appointmentId = oEvent.getParameter("arguments").appointmentId;

			this.getView().bindElement({
				path : `/movies/${movieId}/appointments/${appointmentId}`,
				model : "moviesCatalog",
				events : {
					change : this._onBindingChanged.bind(this)
				}
			});

		},

		_onBindingChanged : function(){
			let sPath = this.getView().getElementBinding("moviesCatalog").getPath();

			// lets try to load the object within MoviesCatalog according to the given path, if it doesn't exist
			// lets navigate to the NotFound page
			if (!this.getView().getModel("moviesCatalog").getObject(sPath)) {
				this.getRouter().getTargets().display("notFound");
			}
		}
      
	});
});