/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce08/odatamodle_multi_update/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
