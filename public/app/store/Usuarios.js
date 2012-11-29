Ext.define('FLUXO.store.Usuarios',{
    extend: 'Ext.data.Store',
    model: 'FLUXO.model.Usuario',
    remoteSort: false,
    autoLoad: false,
    pageSize: 10,
    //autoLoad: {start: 0, limit: 10},
    proxy:{
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'usuarios_list',
            create: 'usuarios_insert',
            update: 'usuarios_update',
            destroy: 'usuarios_delete'
        },
        actionMethods: {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer:{
            type: 'json',
            writeAllFields: true,
            encode: false,
            root: 'data'
        },
        extraParams:{
            sort: '_id, nmusuario',
            dir: 'ASC'
        },
        listeners:{
            exception: function(){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);
            
            if(obj.success){
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'success'
                });
            }else{
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'error'
                });                
            }
        }
    }
});