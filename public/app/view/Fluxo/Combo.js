Ext.define('FLUXO.view.fluxo.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.contaCombo',
    name: 'tecontas_idcontas',
    fieldLabel: 'Conta',
    store: 'Contas',
    displayField: 'nmconta',
    valueField: 'nmconta',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    
    initComponent: function() {
            this.callParent(arguments);
    }
});