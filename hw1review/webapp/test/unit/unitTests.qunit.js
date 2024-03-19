/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce08/hw1review/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
