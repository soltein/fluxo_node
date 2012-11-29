Ext.require(['FLUXO.view.AbstractForm']);
Ext.require(['FLUXO.view.AbstractWindow']);
Ext.require(['FLUXO.view.fluxo.Combo']);

Ext.define('FLUXO.view.fluxo.Edit',{
   extend: 'FLUXO.view.AbstractWindow' ,
   alias: 'widget.fluxoEdit',
   title: 'Edição de Fluxo',
   
   initComponent: function(){
       this.items = [{
               xtype: 'abstractform',
               items: [{
                       xtype: 'contaCombo'
               },{
                       name: 'dsdescricao',
                       fieldLabel: 'Descricao',
                       allowBlank: false
               },{
                       xtype: 'datefield',
                       name: 'dtfluxo',
                       fieldLabel: 'Data',
                       format: 'd/m/Y',
                       submitFormat: 'Y-m-d',
                       allowBlank: false
               },{
                       name: 'nuvalor',
                       fieldLabel: 'Valor',
                       allowBlank: false
               }
               ]
        }];
   
       this.callParent(arguments);
   }   
});
