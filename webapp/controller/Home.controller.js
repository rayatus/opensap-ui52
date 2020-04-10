sap.ui.define([
  "com/jsancho/sap/opensap/ui52/controller/BaseController",
  "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
  
], function(BaseController, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.jsancho.sap.opensap.ui52.controller.Home", {

    formatter : formatter,

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
      
    },

    onAppointmentSelect : function(oEvent){
      
      //In case of single selection
      if ( !oEvent.getParameter("multiSelect") ) {

        //From here we have the whole Appointment object but because doesn't have a 
        //recognized key we retrieve its relative possition from within Movies.json

        let oAppointment = oEvent.getParameter("appointment");        
        let sPath        = oAppointment.getBindingContext("moviesCatalog").getPath();
        //now in sPath we have something like --> /movies/0/appointments/0
        let sMovie = sPath.split('/')[2];
        let sAppointmentInMovie = sPath.split('/')[4];
        this.getRouter().navTo("detail", { 
            movieId : sMovie,
            appointmentId : sAppointmentInMovie
        });
      }
    }

	});
});