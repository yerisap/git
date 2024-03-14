sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e08.jsonmodel.controller.Main", {
            onInit: function () {
                let data = {
                    firstName: "John",  // 문자열
                    enabled: true       // boolean 타입(ture/false)
                };
                // sap.ui.model.JSONModel 의 객체가 생성되면서
                // 동시에 data 변수에 기록된 Structure 정보가
                // Model 의 데이터로 전달된다.
                let oModel = new JSONModel(data);

                // 이 Controller와 연결된 View의 기본 모델로 설정
                this.getView().setModel(oModel);
            }
        });
    });
