Ext.define('FLUXO.store.GraficoDia', {
    extend	: 'Ext.data.Store',
    autoLoad	: false,
    fields	: ['total', 'data', 'tipo'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: 'grafico_dia',
        reader: {
            type		: 'json',
            root		: 'data',
            successProperty	: 'success'
        }
    }
});