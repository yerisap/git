sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e08.ex1.controller.Main", {
            onInit: function () {

            },
            onAdd: function(){
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다.")

                let oView   = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText1");

                let value1  = oInput1.getValue();
                let value2  = oInput2.getValue();

                let result = parseFloat(value1) + parseFloat(value2);
                oText.setText(result);
            },
            onMinus: function(){
                sap.m.MessageToast.show("빼기 버튼을 눌렀습니다.")
                
                let oView   = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText2");

                let value1  = oInput1.getValue();
                let value2  = oInput2.getValue();

                let result = parseFloat(value1) - parseFloat(value2);
                oText.setText(result);
            },
            onMulti: function(){
                sap.m.MessageToast.show("곱하기 버튼을 눌렀습니다.")

                let oView   = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText3");

                let value1  = oInput1.getValue();
                let value2  = oInput2.getValue();

                let result = parseFloat(value1) * parseFloat(value2);
                oText.setText(result);

            },
            onDiv: function(){
                sap.m.MessageToast.show("나누기 버튼을 눌렀습니다.")
                
                let oView   = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText4");

                let value1  = oInput1.getValue();
                let value2  = oInput2.getValue();

                let result = parseFloat(value1) / parseFloat(value2);
                oText.setText(result);

            }

        });
    });
