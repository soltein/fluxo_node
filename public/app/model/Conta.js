Ext.define('FLUXO.model.Conta',{
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {
            name: '_id'
        },
        {
            name: 'nmconta'
        },
        {
            name: 'fgtipo'
        }
    ]
});