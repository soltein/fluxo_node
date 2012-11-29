Ext.require('Ext.window.MessageBox');
Ext.define('FLUXO.controller.Fluxo',{
    extend: 'Ext.app.Controller',
    stores: ['Fluxos'],
    models: ['Fluxo'],
    
    views: [
        'fluxo.Edit',
        'fluxo.List'
    ],
    
    refs:[{
        ref: 'fluxoEdit',
        selector: 'fluxoEdit'
    },{
        ref:'fluxosList',
        selector:'fluxosList'
    }],
    
    init: function(){
        this.control({
           'fluxosList' :{
               itemdblclick: this.edit
           },
           'fluxosList button[action=insert]':{
               click: this.insert
           },
           'fluxosList button[action=edit]':{
               click: this.edit
           },
           'fluxosList button[action=destroy]':{
               click: this.deletar
           },
           'fluxosList button[action=refresh]':{
               click: this.refresh
           },
           'fluxoEdit button[action=save]':{
               click: this.save
           }
        });
    },
    
    refresh: function(){
        this.getFluxosList().store.load();
    },
    
    insert: function(btn, evt, opt){
        var view = Ext.widget('fluxoEdit');
        view.setTitle('Novo Fluxo');
    },
    
    deletar:function(){
        var grid = this.getFluxosList(),
            records = grid.getSelectionModel().getSelection();
            
            if(records.length === 0){
                Ext.Msg.alert('Atenção', 'Nenhum registro selecionado!');
                return false;
            }else{
                Ext.Msg.show({
                    title: 'Confirmar Exclusão',
                    msg: 'Tem certeza que deseja deletar os Fluxos selecionadas?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.MessageBox.WARNING,
                    scope: this,
                    width: 450,
                    fn: function(btn, ev){
                        if(btn == 'yes'){
                            var idSel = [];
                            
                            for(var i = 0; i < records.length; i++){
                                idSel.push(records[i].data._id);
                            }
                            
                            Ext.Ajax.request({
                                scope: this,
                                url: 'fluxos_delete',
                                params: {'_id[]': idSel}, success: function(r){
                                    var obj = Ext.decode(r.responseText);
                                    
                                    if(obj.success){
                                        Ext.Msg.alert('Sucesso', obj.message);
                                        this.getFluxosList().store.loadPage(1);
                                    }else{
                                        Ext.Msg.alert('Erro', obj.message);
                                    }
                                }, failure: function(){
                                    Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.');
                                }
                            });
                        }
                    }
                });
            }
    },
    save: function(button){
        var win = button.up('window'),
            form = win.down('form').getForm(),
            _id = form.getRecord() ? form.getRecord().get('_id') : 0;
            
        if(form.isValid()){
            var record = form.getRecord(),
                values = form.getValues();
                
            if(record){
                if(record.data['_id']){
                    Ext.Ajax.request({
                        scope: this,
                        url: 'fluxos_update',
                        params:{
                            '_id': _id,
                            'dsdescricao': values.dsdescricao,
                            'dtfluxo': values.dtfluxo,
                            'nuvalor': values.nuvalor,
                            'tecontas_idcontas':values.tecontas_idcontas
                            
                        },
                        success: function(r){
                            var obj = Ext.decode(r.responseText);
                            
                            if(obj.success){
                                Ext.Msg.alert('Sucesso', obj.message);
                            }else{
                                Ext.Msg.alert('Erro', obj.message);
                            }
                        },
                        failure: function(){
                            Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.')
                        }
                    });
                    
                    this.getFluxosList().store.load();
                }
            }else{
                var record = Ext.create('FLUXO.model.Fluxo');
                
                console.log(values);
                //record.set(values);
                record.data.dsdescricao = values.dsdescricao;
                record.data.dtfluxo = values.dtfluxo;
                record.data.nuvalor = values.nuvalor;
                record.data.tecontas_idcontas = values.tecontas_idcontas;
                
                console.log("aqui");
                console.log(record);
                
                this.getFluxosStore().add(record);
                this.getFluxosList().store.sync();
            }
            

            win.close();
        }else{
            Ext.ux.Msg.flash({
               msg: 'Há campos preenchidos incorretamente' ,
               type: 'error'
            });
        }
    },
    edit: function(){
        var grid = this.getFluxosList(),
            records = grid.getSelectionModel().getSelection();
        if(records.length === 1){
            var editWind = Ext.widget('fluxoEdit');
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }
    }
});