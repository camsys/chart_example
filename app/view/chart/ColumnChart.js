Ext.define('DEMO.view.chart.ColumnChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.columnChart',
    id: 'columnChart',
    
    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : 'ChartDatapoints',
    theme: 'Base',
    legend: {
        position: 'float',
        x: 800,
        y: 0
    },
    
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: [],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '',
        grid: true,
        minimum: 100000,
        majorTickSteps: 15
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: ''
    }],
    series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
        },
        label: {
          display: 'insideEnd',
            field: ['metric'],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333',
          'text-anchor': 'middle'
        },
        xField: '',
        yField: [],
        title: []
    }]
    
});