Ext.define('FLUXO.store.Contas',{
    extend: 'Ext.data.Store',
    model: 'FLUXO.model.Conta',
    remoteSort: false,
    autoLoad: false,
    pageSize: 10,
    proxy:{
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'contas_list',
            create: 'contas_insert',
            update: 'contas_update',
            destroy: 'contas_delete'
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
            sort: '_id, nmconta',
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