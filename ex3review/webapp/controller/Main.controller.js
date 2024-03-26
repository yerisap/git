sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e08.ex3review.controller.Main", {
            onInit: function () {
                let data = {
                    Data:{
                        Carrid: "",
                        Connid:"0000",
                        Countryfr: "",
                        Cityfrom: "",
                        Airpfrom: "",
                        Countryto:"",
                        Cityto:"",
                        Airpto:"",
                        Distance:"0",
                        Distid: "KM" //기본값
                        },
                    DistanceUnit: [
                        {key: "KM", name:"킬로미터"},
                        {key: "MI", name:"마일"}
                    ]    
                }
                let oModel = new sap.ui.model.json.JSONModel(data);
                this.getView().setModel(oModel, "new");
            },
            onCreate: function(){
                sap.m.MessageToast.show("신규생성 버튼을 눌렀습니다");

                let oView = this.getView();
                let oDialog = oView.byId("idDialog");

                if ( oDialog ) {
                    oDialog.open();
                } else {
                    sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: 'sync.e08.ex3review.view.New',
                        type: 'XML',
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },
            // 팝업창 닫기버튼
            onClose: function(){
                this.byId("idDialog").close();
            },
            // 팝업창 저장버튼
            onSave: function() {
                let oView = this.getView();
                let oModel = oView.getModel(); // SAP Gateway 연결된 Model
                let oNewModel = oView.getModel("new"); // JSON Model 팝업의 Input 데이터를 담당
                let newData = oNewModel.getProperty("/Data");

                // create(경로(엔티티셋), 신규데이터, 결과처리)
                oModel.create(
                    "/ConnectionSet",
                    newData,
                    { 
                        // ( ) :생성된 신규데이터, 응답메세지
                        success: function(oData, oResponse ) {
                            sap.m.MessageBox.success(oData.Carrid + "," + oData.Connid + "가 생성되었습니다.")
                        }, 
                        // 에러는 대부분 중복데이터에서 발생한다
                        error: function(oError) {
                            // console 창에 보이기 때문에 사용자에게 보이지 않는다
                            console.error("생성 중 오류발생");
                            console.log(oError);
                            sap.m.MessageBox.error("생성 중 오류가 발생했습니다.");
                        } }
                );
            },
            onDelete: function () {
                sap.m.MessageToast.show("삭제 버튼을 눌렀습니다.");
                
                let oView = this.getView();
                let oTable = oView.byId("idTable");

                // 선택된 행에 대한 인덱스 정보를
                // 배열로 전달한다.
                let aIndex = oTable.getSelectedIndices();

                if ( !aIndex // aIndex사 존재하지 않을 수도 있고,
                    || // 또는
                    aIndex.length == 0 // 한 줄도 없을수도 있다. 
                    ){
                        // 이런경우에는 다음과 같이 메세지를 출력하고
                        // 로직을 중단한다.
                        sap.m.MessageBox.information("삭제할 데이터가 선택되지 않았습니다.")
                    } else {
                        // 한 줄이라도 선택이 되어 있을 때,
                        sap.m.MessageBox.confirm(
                            "삭제할 데이터는 " + aIndex.length + " 개 입니다. 정말 삭제를 진행할까요?",
                            {
                                onClose: function( oAction ) {
                                    if (oAction == sap.m.MessageBox.Action.OK){
                                        // 진행
                                        sap.m.MessageBox.show("삭제를 진행합니다.");

                                        let oModel = oView.getModel( );
    
                                        // LOOP AT aIndex INTO vIndex 라고 쓴 것과 같다.
                                        for (const vIndex of aIndex) {
                                            let oContext = oTable.getContextByIndex(vIndex);
                                            let path = oContext.getPath();
                                            // sap.m.MessageBox.show(path);

                                            // 경로: /ConnectionSet(Carrid:'AA', Connid='0017')
                                            // 결과=> 항공편 aa, 0017 데이터를 찾아서 삭제한다.
                                            // oModel.remove(경로, 결과처리)
                                            oModel.remove(path, {}); // 이렇게만 적어도 삭제가 실제로 이루어진다.
                                            
                                            // 현재는 한 줄 선택에서만 삭제가 진행된다.
                                            // 데이터 변경을 일으킬때는 한 번에 한 개만 변경이 가능하다.
                                            // gateway 에서 여러 개 변경이 가능하도록 설정해줘야 한다.
                                        
                                        }

                                        // 테이블의 전체 선택 해제
                                        oTable.clearSelection();
                                        
    
                                    } else {
                                        // 취소
                                        sap.m.MessageBox.show("삭제를 취소합니다.");
                                    }
                                }


                            }
                        )
                    }   

            }
                   
        });
    });
