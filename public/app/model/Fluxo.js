Ext.define('FLUXO.model.Fluxo',{
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {
            name: '_id'
        },
        {
            name: 'dsdescricao',
            type: 'string'
        },
        {
            name: 'tecontas_idcontas'
        },
        {
            name: 'dtfluxo',
            type: 'date', 
            dateFormat:'Y-m-d'
        },
        {
            name: 'nuvalor'
        }
    ]
});