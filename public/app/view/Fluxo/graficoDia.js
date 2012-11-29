Ext.define('FLUXO.view.fluxo.graficoDia' ,{
    extend	: 'Ext.chart.Chart',
    alias 	: 'widget.graficoDia',   
    style	: 'background:#fff',
    animate	: true,
    theme	: 'Green',
    //'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' 
    //'Category1' ate 'Category6'. 
    shadow	: true,	
    store	: 'GraficoDia',
    //legend	: false,
    legend	: {
        position: 'right'
    },
    axes: [{
        type	: 'Numeric',
        position: 'left',
        fields	: ['total'],
        label	: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title	: 'Total',
        grid	: true,
        minimum	: 0
    }, {
        type		: 'Category',
        position	: 'bottom',
        fields		: ['data'],
        title		: 'Data'
    }],
    series: [{
        type		: 'Column',
        // Bar, Column, Line, Radar, Scatter  
        //Area, Bar, Cartesian, Column, Gauge, Line, Pie, Radar, Scatter
        axis		: 'bottom',
        highlight	: true,
      /*  tips		: {
            trackMouse: true,
            width	: 300,
            height	: 30,
            renderer: function(storeItem, item) {
                this.setTitle('Total: ' + storeItem.get('total') + ': ' + storeItem.get('Data'));
            }
        },*/
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'tipo',
            //renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333'
        },
        xField: 'data',
        yField: 'total'
    }
    ],    
    initComponent: function(){
        this.callParent();
        this.store.load();
        console.log(this.store);
    }   
});