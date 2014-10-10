Ext.define('DEMO.view.chart.LineChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.lineChart',
    id: 'lineChart',
    
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
        position: 'left',
        fields: ['metric'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'metric',
        grid: true,
        minimum: 100000,
        majorTickSteps: 15
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'US Cities'
    }],
    series: [{
        type: 'line',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
        },
        xField: 'name',
        yField: ['metric'],
        title: ['Current Year']
    }]
    
});