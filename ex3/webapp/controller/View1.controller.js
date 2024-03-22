sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e08.ex3.controller.View1", {
            onInit: function () {
                
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");

                // 콤보박스
                let viewData = {
                    Distid: [
                        { key: 'MI', name: '마일' },
                        { key: 'KM', name: '킬로미터' }
                    ],
                    CreateMode: true
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");

            },

            onCreate: function() {
                // 아무것도 입력되지 않은 깨끗한 상태의 팝업창
                let data = {
                    Carrid: "",
                    Connid: "",
                    Countryfr: "",
                    Cityfrom: "",
                    Airpfrom: "",
                    Countryto: "",
                    Cityto: "",
                    Airpto: "",
                    Deptime: "",
                    Arrtime: "",
                    Distance: "",
                    Distid: "",
                };
                
                MessageToast.show("생성 버튼을 눌렀습니다.");

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new")

                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if (oDialog) {
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e08.ex3.view.New",
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
                    Connid:"",
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

                MessageToast.show("저장버튼을 눌렀습니다.");

                oModel.create(
                    // 경로, 신규데이터, 결과처리
                    "/ConnectionSet",
                    newData,
                    {
                        success: function( oData, oResponse ) {
                            // oData : 생성된 데이터 내용
                            // oResponse : 응답결과 
                            debugger;
                            sap.m.MessageToast.show( oData.Carrid + "항공편이 생성되었습니다." );
                        },
                        error: function(oError){
                            debugger;
                            sap.m.MessageBox.error("생성 중 오류가 발생되었습니다.");
                        }
                    }
                );
                    
                // 생성을 위한 팝업창 닫기
                this.onSaveCancel();
            },

            onDelete: function() {

                debugger;
                MessageToast.show("삭제 버튼을 눌렀습니다.");

                // Main.view 에서 Table id 설정
                // oTable 이라는 이름의 변수를 선언
                let oTable = this.byId("idTable"); // View에서 id 속성값이 idTable 인 항목을 찾음

                let aIndex = oTable.getSelectedIndices();

                if ( !aIndex || aIndex.length == 0 ) { //선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요.");
                    return; // 메세지 출력하고 중단
                } 

                // oData 모델을 View에서 가져온다.
                let oModel = this.getView().getModel();

                // const는 상수를 선언하는 방법, 상숭는 값이 변경되지 않는 특징
                for ( const index of aIndex ) {
                    // 선택된 라인들 중 순서대로 하나씩 모델 연결정보 가져옴
                    let oSelectedContext = oTable.getContextByIndex(index);
                    let carrid = oSelectedContext.getProperty("Carrid");

                    // 해당 모델의 정보에 대한 경로
                    let path = oSelectedContext.getPath();
                    
                    // oData 모델의 remove(경로, 결과처리) 메소드를 이용하면,
                    // 해당 데이터를 삭제명령 보낼 수 있다.
                    // 해당 삭제명령은 이 경우  SAP Gateway의 YE08_GW005의
                    // CARRIERSET_DELETE_ENTITY 메소드가 실행된다.
                    oModel.remove(path, {
                        success: function() {
                            // Exception 이 발생하지 않은 경우
                            // 한 줄 만 삭제처리 실행 ( 두 줄 이상의 경우 )
                            sap.m.MessageBox.success( carrid + " 삭제 성공" );
                            oTable.clearSelection();
                            
                        },
                        error: function(oError) {
                            // 삭제 중 Exception이 발생한 경우
                            sap.m.MessageBox.error("삭제오류");
                        }
                    });
                }    
            }


        });
    });
