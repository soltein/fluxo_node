Ext.define('FLUXO.store.GraficoTotal', {
    extend	: 'Ext.data.Store',
    autoLoad	: false,
    fields	: ['total', 'conta'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: '/grafico_total',
        reader: {
            type		: 'json',
            root		: 'data',
            successProperty	: 'success'
        }
    }
});