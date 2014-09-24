Ext.define('DEMO.view.chart.CityBarChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityBarChart',
    id: 'cityBarChart',
    
    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : 'ChartDatapoints',
    theme: 'Base',
    legend: {
        position: 'bottom'
    },
    
    axes: [{
        type: 'Numeric',
        position: 'bottom',
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
        position: 'left',
        fields: ['name'],
        title: 'US Cities'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
            renderer: function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get('name') + '<br/>Measurement is ' + storeItem.get('metric'));
            }
        },
        label: {
            display: 'insideEnd',
            field: ['metric'],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['metric'],
        title: ['Current Year', 'Last Year']
    }]
    
});