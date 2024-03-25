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
                        Distance:0,
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
            onClose: function(){
                this.byId("idDialog").close();
            }

        });
    });
