Ext.require(['FLUXO.view.AbstractList']);
Ext.define('FLUXO.view.usuario.List',{
    extend: 'FLUXO.view.AbstractList',
    alias: 'widget.usuariosList',
    store: 'Usuarios',
    title: 'Lista de Usuários',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
        
    initComponent: function(){
        this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'Código', 
            dataIndex: '_id', 
            flex: 1
        },

        {
            header: 'Nome', 
            dataIndex: 'nmusuario', 
            flex: 1
        },

        {
            header: 'Login', 
            dataIndex: 'dslogin', 
            flex: 1
        }
        ];
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Usuarios',
            dock: 'bottom',
            displayInfo: true
        }];
    
        this.callParent();
    }
});