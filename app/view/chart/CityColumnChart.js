Ext.define('DEMO.view.chart.CityColumnChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityColumnChart',
    id: 'cityColumnChart',
    
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
        type: 'column',
        axis: 'left',
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
            orientation: 'vertical',
            color: '#333',
          'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['metric'],
        title: ['Current Year', 'Last Year']
    }]
    
});