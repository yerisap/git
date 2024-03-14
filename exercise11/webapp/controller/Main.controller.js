sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e08.exercise11.controller.Main", {
            onInit: function () {

            },
            onSelectionChange: function (oEvent) {
                // 선택한 Item 정보를 Event 로부터 가져옴
                let oItem = oEvent.getParameter("listItem");

                // 선택한 라인에서 출력되는 데이터의 Model의 내용을 가져옴
                let oContext = oItem.getBindingContext();

                // 해당 Model 내용의 Carrid 속성을 화면에 출력
                sap.m.MessageToast.show(oContext.getProperty("Carrid"));
            }
        });
    });
