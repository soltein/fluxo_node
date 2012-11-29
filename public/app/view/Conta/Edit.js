Ext.require(['FLUXO.view.AbstractForm']);
Ext.require(['FLUXO.view.AbstractWindow']);
Ext.require(['FLUXO.view.conta.Combo']);

Ext.define('FLUXO.view.conta.Edit',{
   extend: 'FLUXO.view.AbstractWindow' ,
   alias: 'widget.contaEdit',
   title: 'Edição de Conta',
   
   initComponent: function(){
       this.items = [{
               xtype: 'abstractform',
               items: [{
                       name: 'nmconta',
                       fieldLabel: 'Conta',
                       allowBlank: false
               },{
                       xtype: 'fgtipoCombo'
               }]
        }];
   
       this.callParent(arguments);
   }   
});
