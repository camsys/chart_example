Ext.define('DEMO.view.chart.BarChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.barChart',
    id: 'barChart',

    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : '',
    theme: 'Base',
    legend: {
        position: 'bottom'
    },
    
    axes: [{
        type: 'Numeric',
        position: 'bottom',
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
        position: 'left',
        fields: [],
        title: ''
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
        },
        label: {
            display: 'insideEnd',
            field: [],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
        },
        xField: '',
        yField: [],
        title: []
    }]
    
});