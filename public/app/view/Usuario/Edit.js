Ext.require(['FLUXO.view.AbstractForm']);
Ext.require(['FLUXO.view.AbstractWindow']);

Ext.define('FLUXO.view.usuario.Edit',{
   extend: 'FLUXO.view.AbstractWindow' ,
   alias: 'widget.usuarioEdit',
   title: 'Edição de Usuário',
   
   initComponent: function(){
       this.items = [{
               xtype: 'abstractform',
               items: [{
                       name: 'nmusuario',
                       fieldLabel: 'Nome',
                       allowBlank: false
               },{
                       name: 'dslogin',
                       fieldLabel: 'Login',
                       allowBlank: false                       
               },{
                       name: 'dssenha',
                       fieldLabel: 'Senha',
                       allowBlank: false,
                       inputType: 'password'
               }]
        }];
   
       this.callParent(arguments);
   }   
});
