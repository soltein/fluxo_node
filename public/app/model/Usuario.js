Ext.define('FLUXO.model.Usuario',{
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {
            name: '_id'
        },
        {
            name: 'nmusuario'
        },
        {
            name: 'dslogin'
        },
        {
            name: 'dssenha'
        }
    ]
});