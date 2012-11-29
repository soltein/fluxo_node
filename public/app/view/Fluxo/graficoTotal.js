Ext.define('FLUXO.view.fluxo.graficoTotal' ,{
    extend	: 'Ext.chart.Chart',
    alias 	: 'widget.graficoTotal',   
    style	: 'background:#fff',
    animate	: true,
    theme	: 'Sky',
    //'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' 
    //'Category1' ate 'Category6'. 
    shadow	: true,	
    store	: 'GraficoTotal',
    //legend	: false,
    legend	: {
        position: 'right'
    },
    axes: [{
        type	: 'Numeric',
        position: 'bottom',
        fields	: ['total'],
        label	: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title	: 'Total',
        grid	: false,
        minimum	: 0
    }, {
        type		: 'Category',
        position	: 'left',
        fields		: ['conta'],
        title		: 'Contas'
    }],
    series: [{
        type		: 'Bar',
        // Bar, Column, Line, Radar, Scatter  
        //Area, Bar, Cartesian, Column, Gauge, Line, Pie, Radar, Scatter
        axis		: 'bottom',
        highlight	: true,
        tips		: {
            trackMouse: true,
            width	: 300,
            height	: 30,
            renderer: function(storeItem, item) {
                this.setTitle('Conta: ' + storeItem.get('conta') + ': ' + storeItem.get('total'));
            }
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'total',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333'
        },
        xField: 'conta',
        yField: 'total'
    }
    ],    
    initComponent: function(){
        this.callParent();
        this.store.load();
        console.log(this.store);
    }   
});