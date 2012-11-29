var fgtipos = Ext.create('Ext.data.Store', {
    fields: ['fgtipo', 'name'],
    data : [
        {"fgtipo":1, "name":"Receber"},
        {"fgtipo":2, "name":"Pagar"}
    ]
});

Ext.define('FLUXO.view.conta.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.fgtipoCombo',
    name: 'fgtipo',
    fieldLabel: 'Tipo',
    store: fgtipos,
    displayField: 'name',
    valueField: 'fgtipo',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    
    initComponent: function() {
            this.callParent(arguments);
    }
});