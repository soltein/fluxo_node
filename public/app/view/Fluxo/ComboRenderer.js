Ext.define('FLUXO.view.fluxo.ComboRenderer', {
    extend		: 'Ext.form.field.ComboBox',
    alias		: 'widget.fluxoComboRenderer',
    name 		: 'tecontas_idcontas',    
    fieldLabel		: 'Contas',
    store		: 'Contas',
    displayField	: 'nmconta',
    valueField		: 'nmconta',
    queryMode		: 'local',	 
    typeAhead   	: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
        this.store.load();
    }
});