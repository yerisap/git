sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e08.input.controller.View1", {

            // JSONModel
            onInit: function () {
                let data = {
                    value1: 10,
                    value2: 20,
                    result: 30
                };
                let oModel = new JSONModel(data);

                // 기본모델로 사용하고자 이름을 주지 않는다.
                this.getView().setModel(oModel);

                // 입력값 점검을 위한 MessageManager
                let oMsgManager = sap.ui.getCore().getMessageManager();
                oMsgManager.registerObject(this.getView(), true)

            },

            // 
            onAdd: function() {
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다.")

                let oView   = this.getView();
                let oInput1 = oView.byId("idInput1");
                let oInput2 = oView.byId("idInput2");
                let oText   = oView.byId("idText");

                let value1  = oInput1.getValue();
                let value2  = oInput2.getValue();

                // 빈 값은 더하기 시, 0 의 결과를 반환.
                if ( value1 == "" ) {
                    value1 = 0;
                }
                
                if ( value2 == "" ) {
                    value2 = 0;
                }

                // let result = value1 + value2 는 문자열로 취급한다. ( 3 + 5 = 35)

                // parseInt = 정수, 가져온 값의 소수가 없어진다. (10.9 + 10.9 = 20)
                // let result = parseInt(value1) + parseInt(value2);

                // 가져온 값을 실수로 취급하면, 소수가 유지된다.
                let result = parseFloat(value1) + parseFloat(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==> " + result);
            },

            // onAddJSON 구현
            onAddJSON: function(){
                sap.m.MessageToast.show("JSON으로 더하기 버튼을 눌렀습니다.")

                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다

                let data = oModel.getData(); // JSON Model만 사용할 수 있는
                                            // getData() 를 통해 데이터 조회

                // model의 type 을 int로 변경
                let value1 = data.value1;
                let value2 = data.value2;

                // value를 parseInt 로 개별 설정 (정수)
                // let value1 = parseInt(data.value1);
                // let value2 = parseInt(data.value2);
                let result = value1 + value2;

                data.result = result;

                oModel.setData(data);
            }

            // onValidError: function (oEvent) {
            //     oEvent.getSource().setValueState("Erorr");
            // }


        });
    });
