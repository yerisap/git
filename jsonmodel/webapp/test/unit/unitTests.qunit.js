/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce08/jsonmodel/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
