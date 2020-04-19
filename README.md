# OpenSAP UI5 
My stuff related to [Evolved Web Apps with SAPUI5](https://open.sap.com/courses/ui52/) OpenSAP course developed with **VSCode** and the **@ui5/cli tool**.

During the course different Apps will be developed, so every one will be selfcontained in a different folder:
* **MoviesApp**: this is the first app where with a _SimpleForm_ and a _PlanningCalendar_ all different appointments retrieved from a local JSON file will be displayed. It allows to play with following subjects:
  * **Basic project structure**: project structure created manually, little by little, so that the project could work with the minumum things setted up.
  * **Routing**: 3 different pages are showned: Home, Detail and NotFound.
  * **Internazionalizaion**: all texts are obtained from the respective _i18n_ file.

* **CargoApp**: second app from the course, in this example the app corresponds to a _Master-Detail_ type of app.
  * **Project structure**: instead of using an already prepared template within SAP WebIDE the project structure has been manually prepared for having kind of an "own scafolding template" which will allow to develop the rest of the app.
  * **Routing with FlexibelColumnLayout**: so that we could render a Master-Detail layout via FlexibleColumnLayout it's needed to use "sap.f.routing.Router" as the _routerClass_ and using _controlAggretation_ with "beginColumnPages".
  * **Consuming OData services**: in order to be able to consume a _SAP DemoGateway ES5 OData_ service locally in the same way WebIDE does via destinatins it's needed to use a reverse proxy, also for the CORS policy, so by following option 2 in blog [UI5 Tooling – Custom Server Middleware Proxy Extension](https://blogs.sap.com/2019/08/26/ui5-tooling-custom-server-middleware-proxy-extension/) I managed to consume it.
