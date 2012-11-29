Ext.require('Ext.window.MessageBox');
Ext.define('FLUXO.controller.Usuario',{
    extend: 'Ext.app.Controller',
    stores: ['Usuarios'],
    models: ['Usuario'],
    
    views: [
        'usuario.Edit',
        'usuario.List'
    ],
    
    refs:[{
        ref: 'usuarioEdit',
        selector: 'usuarioEdit'
    },{
        ref:'usuariosList',
        selector:'usuariosList'
    }],
    
    init: function(){
        this.control({
           'usuariosList' :{
               itemdblclick: this.edit
           },
           'usuariosList button[action=insert]':{
               click: this.insert
           },
           'usuariosList button[action=edit]':{
               click: this.edit
           },
           'usuariosList button[action=destroy]':{
               click: this.deletar
           },
           'usuariosList button[action=refresh]':{
               click: this.refresh
           },
           'usuarioEdit button[action=save]':{
               click: this.save
           }
        });
    },
    
    refresh: function(){
        this.getUsuariosList().store.load();
    },
    
    insert: function(btn, evt, opt){
        var view = Ext.widget('usuarioEdit');
        view.setTitle('Novo Usuário');
    },
    
    deletar:function(){
        var grid = this.getUsuariosList(),
            records = grid.getSelectionModel().getSelection();
            
            if(records.length === 0){
                Ext.Msg.alert('Atenção', 'Nenhum registro selecionado!');
                return false;
            }else{
                Ext.Msg.show({
                    title: 'Confirmar Exclusão',
                    msg: 'Tem certeza que deseja deletar os usuários selecionadas?',
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
                                url: 'usuarios_delete',
                                params: {'_id[]': idSel}, success: function(r){
                                    var obj = Ext.decode(r.responseText);
                                    
                                    if(obj.success){
                                        Ext.Msg.alert('Sucesso', obj.message);
                                        this.getUsuariosList().store.loadPage(1);
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
                        url: 'usuarios_update',
                        params:{
                            '_id': _id,
                            'nmusuario': values.nmusuario,
                            'dslogin': values.dslogin,
                            'dssenha': values.dssenha
                            
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
                    
                    this.getUsuariosList().store.load();
                }
            }else{
                var record = Ext.create('FLUXO.model.Usuario');
                
                record.set(values);
                
                //console.log(record);
                
                this.getUsuariosStore().add(record);
                this.getUsuariosList().store.sync();
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
        var grid = this.getUsuariosList(),
            records = grid.getSelectionModel().getSelection();
        if(records.length === 1){
            var editWind = Ext.widget('usuarioEdit');
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }
    }
});