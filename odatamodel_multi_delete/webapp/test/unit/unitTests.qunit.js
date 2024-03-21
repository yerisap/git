/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce08/odatamodel_multi_delete/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
