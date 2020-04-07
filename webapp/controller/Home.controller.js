sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
  
], function(Controller, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.jsancho.sap.opensap.ui52.controller.Home", {

    formatter : formatter,

    onInit: function(){
     
    },

    onPressFindMovies : function(oEvent){
      let sCity          = this.byId('sfCity').getValue();
      let sGenre         = this.byId('sGenre').getSelectedItem().getKey();
      let oCalendar      = this.byId('planningCalendar');
      

      let oFilterCity    = sCity  ? new Filter("info", FilterOperator.EQ, sCity) : null;

      let oFilterGenre   = sGenre 
        ? sGenre === this.getView().getModel("i18n").getResourceBundle().getText("itemAll") ? null : new Filter("genre", FilterOperator.EQ, sGenre) 
        : null;

      oCalendar.getBinding('rows').filter(oFilterGenre);    
      oCalendar.getAggregation('rows').forEach(row => { row.getBinding('appointments').filter(oFilterCity) });
      
    }

	});
});