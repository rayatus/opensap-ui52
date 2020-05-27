sap.ui.define(
  [
    "com/jsancho/sap/opensap/ui52/cargo/controller/BaseController",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel",
  ],
  function (
    BaseController,
    formatter,
    Filter,
    FilterOperator,
    FilterType,
    JSONModel
  ) {
    "use strict";

    return BaseController.extend(
      "com.jsancho.sap.opensap.ui52.cargo.controller.SalesOrderList",
      {
        formatter: formatter,

        onInit: function () {
          // Model used for passing specific data to the view from its own controller
          let oViewModel = new JSONModel({
            totalRows: this.getResourceBundle().getText(
              "salesOrderListTable.totalRows", [0]
            ),
          });
          this.setModel(oViewModel, "SalesOrderListView");
        },

        /**
         * Event handler when a line is selected in the list so we could call the detail view
         * for that specific Order
         */
        onItemClicked: function (oEvent) {
          //now in sPath we have something like --> /SalesOrderSet('0500000000')
          let sPath = oEvent.getSource().getBindingContext().getPath();
          let sOrderId = sPath.split("'")[1];

          //Let's tell the FlexibleColumnLayout that needs to change its layout
          //for displaying second column. We use the "layout" URL parameter for that
          this.getOwnerComponent()
            .getHelper()
            .then(
              function (oHelper) {
                this.getRouter().navTo("salesOrderDetail", {
                  layout: oHelper.getNextUIState(1).layout,
                  orderId: sOrderId,
                });
              }.bind(this)
            );
        },

        /**
         * Event Handler to add filters to the OData GET request according to the free text entered
         * in the search box
         */
        onSalesOrdersSearch: function (oEvent) {
          let oFilter;
          let sQuery = oEvent.getParameter("query");

          //Tell the filter which fields to look at
          if (sQuery) {
            oFilter = new Filter({
              //Let's filter by only those columns flaged as 'filterable' in $metadata
              filters: [
                new Filter({
                  path: "SalesOrderID",
                  operator: FilterOperator.Contains,
                  value1: sQuery,
                  caseSensitive: true,
                }), //unfortunatlly ES5 Gateway's oData doesn't support toUpper functionality
                new Filter({
                  path: "CustomerName",
                  operator: FilterOperator.Contains,
                  value1: sQuery,
                  caseSensitive: true,
                }), //unfortunatlly ES5 Gateway's oData doesn't support toUpper functionality
              ],
              and: false,
            });
          }

          //Apply given filter
          this.byId("salesOrderListTable")
            .getBinding("items")
            .filter(oFilter, FilterType.Application);
        },

        /**
         * Event handler executed every time the table is updated so from here we could:
         * - update the total number of rows matching the selected filter criteria
         */
        onUpdateFinished: function (oEvent) {
          let sTitle,
              iTotalItems = oEvent.getParameter("total");

          sTitle = this.getResourceBundle().getText( "salesOrderListTable.totalRows", [iTotalItems]) ;
          this.getModel("SalesOrderListView").setProperty("/totalRows", sTitle);
        },
      }
    );
  }
);
