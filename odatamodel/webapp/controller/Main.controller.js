sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e08.odatamodel.controller.Main", {
            
            onInit: function () {
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");

                let viewData = {
                    Currency: [
                        { key: 'KRW', name: '원화' },
                        { key: 'USD', name: '달러' }
                    ]
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");
            },

            onCurrencyChange: function (oEvent) {
                let Currency = oEvent.getParameter("value");
                let oNewModel = this.getView().getModel("new");
                oNewModel.setProperty("/Currcode",  Currency);
            },

            onCreate: function() {
                    let oView = this.getView();
                    let oDialog = oView.byId("idNewDialog");

                    if (oDialog) {
                        oDialog.open();
                    } else {
                        Fragment.load({
                            id: oView.getId(),
                            name: "sync.e08.odatamodel.view.New",
                            type: "XML",
                            controller: this             // View의 Controller를 공유
                        }).then(function(oDialog){
                            oView.addDependent(oDialog); // View 의 Model을 공유
                            oDialog.open()
                        });
                    }    
                },

                onSaveCancel: function(){
                    let oDialog = this.getView().byId("idNewDialog");
                    if ( oDialog ) {
                        oDialog.close();
                    }

                    // 빈값만 있는 정보로 새로운 JSONModel을 만들어서
                    // 기존의 new 모델을 교체해버림 => 데이터 초기화
                    let oNewModel = this.getView().getModel("new");

                    oNewModel.setData({
                        Carrid:"",
                        Carrname:"",
                        Currcode:"",
                        Url:""
                    });

                    let oComboBox = this.byId("idComboBox");
                    oComboBox.setSelectedKey("");
                    oComboBox.setSelectedItem("");
                    oComboBox.setSelectedItemId("");
                },

                onSaveConfirm: function() {
                    let oView = this.getView();
                    let oNewModel = oView.getModel("new"); // JSON Model
                    let oModel = oView.getModel();         // OData Model

                    let newData = oNewModel.getData();
                    // newData = { Carrid:"~~", Carrname:"~~" , ...}

                    debugger;

                    // HTTP Method 에서 POST 방식으로 호출하는 방법
                    oModel.create(
                        // 경로, 신규데이터, 결과처리
                        "/CarrierSet",
                        newData,
                        {
                            success: function( oData, oResponse ) {
                                // oData : 생성된 데이터 내용
                                // oResponse : 응답결과 
                                debugger;
                                sap.m.MessageToast.show( oData.Carrid + "항공사가 생성되었습니다." );
                            },
                            error: function(oError){
                                debugger;
                                sap.m.MessageBox.error("생성 중 오류가 발생되었습니다.");
                            }
                        }
                    );
                }
        });
    });
