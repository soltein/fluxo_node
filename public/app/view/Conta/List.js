Ext.require(['FLUXO.view.AbstractList']);
function fnfgtipo(val){
    if(val == 1)
        return 'Receber';
    else if(val == 2)
        return 'Pagar';
    else
        return 'undefined';
}
Ext.define('FLUXO.view.conta.List',{
    extend: 'FLUXO.view.AbstractList',
    alias: 'widget.contasList',
    store: 'Contas',
    title: 'Lista de Contas',
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
            header: 'Conta', 
            dataIndex: 'nmconta', 
            flex: 1
        },

        {
            header: 'Tipo', 
            dataIndex: 'fgtipo', 
            flex: 1, 
            renderer: fnfgtipo
        }
        ];
        
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Contas',
            dock: 'bottom',
            displayInfo: true
        }];
    
        this.callParent();
    }
});