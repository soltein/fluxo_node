Ext.require('Ext.window.MessageBox');
Ext.define('FLUXO.controller.Conta',{
    extend: 'Ext.app.Controller',
    stores: ['Contas'],
    models: ['Conta'],
    
    views: [
        'conta.Edit',
        'conta.List'
    ],
    
    refs:[{
        ref: 'contaEdit',
        selector: 'contaEdit'
    },{
        ref:'contasList',
        selector:'contasList'
    }],
    
    init: function(){
        this.control({
           'contasList' :{
               itemdblclick: this.edit
           },
           'contasList button[action=insert]':{
               click: this.insert
           },
           'contasList button[action=edit]':{
               click: this.edit
           },
           'contasList button[action=destroy]':{
               click: this.deleteConta
           },
           'contasList button[action=refresh]':{
               click: this.refresh
           },
           'contaEdit button[action=save]':{
               click: this.save
           }
        });
    },
    
    refresh: function(){
        this.getContasList().store.load();
    },
    
    insert: function(btn, evt, opt){
        var view = Ext.widget('contaEdit');
        view.setTitle('Nova Conta');
    },
    
    deleteConta:function(){
        var grid = this.getContasList(),
            records = grid.getSelectionModel().getSelection();
            
            if(records.length === 0){
                Ext.Msg.alert('Atenção', 'Nenhum registro selecionado!');
                return false;
            }else{
                Ext.Msg.show({
                    title: 'Confirmar Exclusão',
                    msg: 'Tem certeza que deseja deletar as contas selecionadas?',
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
                                url: 'contas_delete',
                                params: {'_id[]': idSel}, success: function(r){
                                    var obj = Ext.decode(r.responseText);
                                    
                                    if(obj.success){
                                        Ext.Msg.alert('Sucesso', obj.message);
                                        this.getContasList().store.loadPage(1);
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
            id = form.getRecord() ? form.getRecord().get('_id') : 0;
            
        if(form.isValid()){
            var record = form.getRecord(),
                values = form.getValues();
                
            if(record){
                if(record.data['_id']){
                    Ext.Ajax.request({
                        scope: this,
                        url: 'contas_update',
                        params:{
                            '_id': id,
                            'nmconta': values.nmconta,
                            'fgtipo': values.fgtipo
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
                    
                    this.getContasList().store.load();
                }
            }else{
                var record = Ext.create('FLUXO.model.Conta');
                
                record.set(values);
                
                //console.log(record);
                
                this.getContasStore().add(record);
                this.getContasList().store.sync();
            }
            
            //this.getContasList().store.load();
            win.close();
        }else{
            Ext.ux.Msg.flash({
               msg: 'Há campos preenchidos incorretamente' ,
               type: 'error'
            });
        }
    },
    edit: function(){
        var grid = this.getContasList(),
            records = grid.getSelectionModel().getSelection();
        if(records.length === 1){
            var editWind = Ext.widget('contaEdit');
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }
    }
});