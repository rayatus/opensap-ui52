sap.ui.define(
  [
    "com/jsancho/sap/opensap/ui52/cargo/controller/BaseController",
		"../model/formatter",
		"sap/ui/model/json/JSONModel",
  ],
  function (BaseController, formatter, JSONModel) {
    "use strict";

    return BaseController.extend(
      "com.jsancho.sap.opensap.ui52.cargo.controller.SalesOrderDetail",
      {
        formatter: formatter,

        onInit: function () {
          // Model used for passing specific data to the view from its own controller
          let oViewModel = new JSONModel({
            totalItems: this.getResourceBundle().getText(
              "salesOrderDetail.section.Items",
              [0]
            ),
          });
          this.setModel(oViewModel, "SalesOrderDetailView");

          this.getRouter()
            .getRoute("salesOrderDetail")
            .attachMatched(this._onRouteMatched, this);
        },

        /**
         * Event handler executed every time the table is updated so from here we could:
         * - update the total number of rows matching the selected filter criteria
         */
        onUpdateFinished: function (oEvent) {
          let sTitle,
            iTotalItems = oEvent.getParameter("total");

          sTitle = this.getResourceBundle().getText(
            "salesOrderDetail.section.Items",
            [iTotalItems]
          );
          this.getModel("SalesOrderDetailView").setProperty(
            "/totalItems",
            sTitle
          );
        },
        _onRouteMatched: function (oEvent) {
          // Retrieve mandatory data from the URL in order to determine which
          // salesOrder we are displaying
          let sOrderId = oEvent.getParameter("arguments").orderId;

          this.getView().bindElement({
            path: `/SalesOrderSet('${sOrderId}')`,
            events: {
              change: this._onBindingChanged.bind(this),
            },
          });
        },

        _onBindingChanged: function () {
          let sPath = this.getView().getElementBinding().getPath();

          // lets try to load the object within the model according to the given path, if it doesn't exist
          // lets navigate to the NotFound page
          if (!this.getView().getModel().getObject(sPath)) {
            this.getRouter().getTargets().display("notFound");
          }
        },
      }
    );
  }
);
