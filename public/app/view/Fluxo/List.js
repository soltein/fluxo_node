Ext.require(['FLUXO.view.fluxo.ComboRenderer']);
Ext.require(['FLUXO.view.AbstractList']);

Ext.define('FLUXO.view.fluxo.List',{
    extend: 'FLUXO.view.AbstractList',
    alias: 'widget.fluxosList',
    store: 'Fluxos',
    title: 'Lista de Fluxo',
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
            header: 'Descrição', 
            dataIndex: 'dsdescricao', 
            flex: 1
        },

        {
            header: 'Data', 
            dataIndex: 'dtfluxo',
            format: 'd/m/Y',
            xtype: 'datecolumn',
            flex: 1
        },

        {
            header: 'Valor', 
            dataIndex: 'nuvalor', 
            flex: 1
        },

        {
            header: 'Conta', 
            dataIndex: 'tecontas_idcontas', 
            flex: 1,
            renderer	: Ext.util.Format.comboRenderer(Ext.create('FLUXO.view.fluxo.ComboRenderer'))
        }
        ];
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Fluxos',
            dock: 'bottom',
            displayInfo: true
        }];
    
        this.callParent();
    }
});