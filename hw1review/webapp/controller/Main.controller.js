sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("sync.e08.hw1review.controller.Main", {
            onInit: function () {

            },
            // 1. 클릭이벤트 구현
            onSelectionChange: function(oEvent) {
                // debugger;
                let oListItem = oEvent.getParameter("listItem");
                let oContext = oListItem.getBindingContext();
                let carrid   = oContext.getProperty("Carrid");
                let connid   = oContext.getProperty("Connid");

                MessageToast.show("선택하신 라인은 항공사: " + carrid + ", 항공편: " + connid + "의 정보입니다.");
            
            // 2. Fragment 의 Dialog 를 오픈하도록 한다.
            let oView = this.getView();
            let oDialog = oView.byId("idDialog");
            // oDialog = this.byId("idDialog");
            // oDialog = this.getView.byId("idDialog");
            
            // 선택한 라인의 모델의 경로를 전달
            let currentModelPath = oContext.getPath();
            oView.bindElement(currentModelPath);

                if (oDialog){
                    // Main 화면에서 있을 때
                    oDialog.open();
                } else {
                    // Main 화면에서 없을 때
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e08.hw1review.view.Info",
                        type: "XML",
                        controller: this
                        // this: 현재 진행되고 있는 객체 = 현재는 controller
                    }).then(
                        //load 후
                        function (oDialog) {
                            // 현재 Main.view 에 연결 ( Model 을 함께 사용 )
                            oView.addDependent(oDialog);
                            oDialog.open();
                        }
                    );
                }
            }
            ,
            onClosePress: function () {
                let oDialog = this.byId("idDialog");
                if (oDialog) {
                    oDialog.close();
                }
            }

        });
    });
