sap.ui.define([
	"com/jsancho/sap/opensap/ui52/cargo/controller/BaseController",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
], function(BaseController, formatter, Filter, FilterOperator, FilterType) {
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
			
		},

		onSalesOrdersSearch : function(oEvent){

			let oFilter;
			let sQuery = oEvent.getParameter('query');

			//Tell the filter which fields to look at
			if (sQuery){
				oFilter = new Filter({
					//Let's filter by only those columns flaged as 'filterable' in $metadata
					filters: [
						new Filter({
							path: 'SalesOrderID',
							operator: FilterOperator.Contains,
							value1: sQuery,
							caseSensitive: true }), //unfortunatlly ES5 Gateway's oData doesn't support toUpper functionality
						new Filter({
							path: 'CustomerName',
							operator: FilterOperator.Contains,
							value1: sQuery,
							caseSensitive: true }) //unfortunatlly ES5 Gateway's oData doesn't support toUpper functionality
					],
					and : false,
				});
			}

			//Apply given filter
			this.byId('salesOrderListTable').getBinding('items').filter(oFilter, FilterType.Application);
		},
    

	});
});